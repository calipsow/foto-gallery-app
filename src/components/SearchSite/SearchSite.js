import React from 'react';
import { useParams } from 'react-router-dom'
import './SearchSite.css'
import 'jquery/dist/jquery.min.js'; // Have to install and import jQuery because of bootstrap modal's dependency
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from '../Navbar/Navbar';
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader';
import NoResults from './../assets/NoResults';
import FooterComponent from '../footer/footer';
import Unsplash from './../assets/unsplash';

export default function SearchSite(){
    let { query } = useParams();
    
    const [queryStr, setQueryStr] = React.useState(query)
    
    React.useEffect(()=>{
        setQueryStr(query);
    },[query])


    return(
        <SearchSiteClass query={queryStr} />
    )
}


class SearchSiteClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, success: null, loadingPage: 1, elements: [], temporarilyUrl: '/bastian-riccardi-PBTEeIadS20-unsplash.jpg', errorLoading: false
        }
        this.loadPages = 1
        this.data = []
        this.temporarilyUpdate = {}
        this.elements = []
        this.query = this.props.query
    }


    async componentDidMount(){
        window.scrollTo(0, 0)
        this.data = await this.fetchDataQuery()
 
        if(this.data.total === 0 ){
            this.setState({loading: false, success: false})
            return;
        }
        this.data.results.forEach(dataSet => {
            this.temporarilyUpdate.url = dataSet.urls.regular; this.temporarilyUpdate.alt = dataSet.alt_description; this.temporarilyUpdate.likes = dataSet.likes

            this.elements.push(this.createElementImage(dataSet.urls.small, dataSet.alt_description || this.props.query, dataSet.likes, dataSet))
        })
        this.loadPages += 1
        this.setState({loading: false, success: true, loadingPage: this.loadPages, elements: this.elements, errorLoading: false})
    }

    async componentDidUpdate(){
        if( this.query === this.props.query ) return;
        this.query = this.props.query 
        this.setState({loading: true})
        this.elements = [];
        this.data = await this.fetchDataQuery()
        console.log(this.data)
        if(this.data.total === 0 ){
            this.setState({loading: false, success: false})
            return;
        }
        this.data.results.forEach(dataSet => {
            this.temporarilyUpdate.url = dataSet.urls.regular; this.temporarilyUpdate.alt = dataSet.alt_description; this.temporarilyUpdate.likes = dataSet.likes

            this.elements.push(this.createElementImage(dataSet.urls.small, dataSet.alt_description || this.props.query, dataSet.likes, dataSet))
        })
        this.loadPages += 1
        this.setState({loading: false, success: true, loadingPage: this.loadPages, elements: this.elements, errorLoading: false})
    }

    fetchDataQuery = async () => {
        return await fetch(`http://localhost:3588/api/search/photos?query=${this.props.query}&pageCount=${this.loadPages.toString()}`,{'cors':'no-cors'})
        .then(response => response.json())
        .then(response  => response.response )
        .catch(error => [error] )
    }

    generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }

    createElementImage = (url, alt, likes, dataSet) => {
        const k = this.generateKey()
        return(
            <p key={k} style={{textAlign: 'left', margin: '15px'}}>
                <Link to={'/photo/statics/'+dataSet.id}> 
                <img id={k} className="rounded mx-auto d-block img-fluid" alt={alt} src={url} /></Link>
                <legend htmmlfor={k}><b>{likes+'    '}</b><i className="far fa-heart"></i></legend>
                <Link style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}} to={'/user-profile/'+dataSet.user.username}>{dataSet.user.username.toUpperCase()}</Link> 

                <a className="btn-icons link-elem-icon"     
                        onClick={ e => this.handleDownloadEvent(e) }
                        href={dataSet.urls.small_s3}
                        target="_blank"
                        download                                                              
                        style={{cursor:'pointer', marginLeft: '50px'}}
                    >
                        <i className="fas fa-cloud-download-alt" id={dataSet.urls.small_s3} style={{color: 'white'}}></i>

                     
                </a> 
                <a className="btn-icons" href={dataSet.links.html} target="_blank" style={{color: 'black', marginLeft: '50px'}}>                 
                    {<i className="fa fa-link" style={{color: 'white'}}></i>}
                </a>
                
            </p>
        )
    }

    

    loadMoreButton = () => {

        return (
            <div style={{backgroundColor: 'transparent', width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>

                <button 
                className={"btn btn-dark"} 
                style={{marginBottom: '25px', marginTop: '25px'}}
                onClick={e => this.handleLoadMore()}
                >Load More</button>
            </div>
        )
    }

    handleLoadMore = async () => {
        this.data = await this.fetchDataQuery()

        if(this.data.total === 0 && this.state.success === null){
            this.setState({loading: false, success: false})
            return;
        }
        this.data.results.forEach(dataSet => {            

            this.elements.push(this.createElementImage(dataSet.urls.small, dataSet.alt_description || this.props.query, dataSet.likes, dataSet))
        })
        this.loadPages += 1
        this.setState({loadingPage: this.loadPages, elements: this.elements})
    }
 
    handleDownloadEvent = (e) => {
        e.preventDefault();
        const key = this.generateKey();    

        fetch(e.target.id, {
            method: "GET",
            headers: {
                'cors':'no-cors'
            }
        })
        .then(response => {
            response.arrayBuffer().then(function(buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", key+'.jpeg'); //or any other extension
            document.body.appendChild(link);
            link.click();
            });
        })
        .catch(err => {
            console.log(err);
        });
        
    }
    handleError = (err) => {
        this.setState({errorLoading: true})
    }

    render() {

        return (

            <React.Fragment>
                <NavBar />
                <div className="card bg-dark text-white"style={{borderRadius:'0', minHeight: '500px'}}>
                    { 
                        !this.state.errorLoading ? 
                        <img className="card-img" src={this.temporarilyUpdate.url} alt={this.temporarilyUpdate.alt} 
                        onError={e => this.handleError(e) }
                        />
                        : 
                        <img class="card-img" src={this.state.temporarilyUrl} alt={this.temporarilyUpdate.alt} 
                        onError={e => this.handleError(e) }
                        />                    
                    }

                    <div className="card-img-overlay" style={{borderRadius:'0'}}>
                    <div className="jumbotron" style={{backgroundColor:'rgba(170,170,170,.2)', backdropFilter:'blur(2px)'}}>
                            <h1 className="display-4">{ !this.state.loading ? this.props.query.toUpperCase().replace(/[-]/g, ' ') : '' }</h1>

                                                    
                            </div>

                    </div>
                </div>


                <div style={{paddingTop: '20px', justifyContent: 'center', backgroundColor: '#e1e2e2'}} className="d-flex align-content-around flex-wrap">
                    {
                        this.state.loading && this.state.success === null ? <Loader />
                        : !this.state.success && !this.state.loading  ? <NoResults/> 

                        : this.state.elements.map( elem => {
                            return elem
                        })
                    }
                    
                </div>
                { !this.state.loading && !this.state.success || this.state.success ? this.loadMoreButton() : <div style={{width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <div className="alert alert-ligh" role="alert">Leider wurden keine weiteren Ergebnisse gefunden.</div></div>  }
                { !this.state.loading ? <FooterComponent /> : <></>}
            </React.Fragment>
        )
    }
}