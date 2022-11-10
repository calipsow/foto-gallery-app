import React from 'react';
import * as ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom'
import './SearchSite.css'
import 'jquery/dist/jquery.min.js'; // Have to install and import jQuery because of bootstrap modal's dependency
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from '../Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../loader/Loader';
import NoResults from './../assets/NoResults';
import FooterComponent from '../footer/footer';
import Like from '../assets/likes';

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
            loading: true, success: null, loadingPage: 1, elements: [], temporarilyUrl: '/bastian-riccardi-PBTEeIadS20-unsplash.jpg', errorLoading: false, 
            textDisplay: window.innerWidth < 500 ? false : true, failedLoadings: []
        }
        this.loadPages = 1
        this.data = []
        this.temporarilyUpdate = {}
        this.elements = []
        this.query = this.props.query
  
    }


    setSize = ( size ) => {
        console.log('sized size', size)
        if( size < 500 && this.state.textDisplay ){
            this.setState({textDisplay: false})

        } else if( size >= 500 && !this.state.textDisplay ) {
            this.setState({textDisplay: true})
        } 

    }

    async componentDidMount(){
        window.scrollTo(0, 0)
        window.addEventListener('resize', e => this.setSize(window.innerWidth) )
        this.data = await this.fetchDataQuery()

        if(this.data.total === 0 ){
            this.setState({loading: false, success: false})
            return;
        }
        this.data.results.forEach(dataSet => {
            this.temporarilyUpdate.url = dataSet.urls.full; 
            this.temporarilyUpdate.alt = dataSet.alt_description; 
            this.temporarilyUpdate.likes = dataSet.likes; 
            this.temporarilyUpdate.data = dataSet

            this.elements.push(this.createElementImage(dataSet.urls.small, dataSet.alt_description || this.props.query, dataSet.likes, dataSet))
        })
        this.loadPages += 1
        this.setState({loading: false, success: true, loadingPage: this.loadPages, elements: this.elements, errorLoading: false})
    }

    async componentDidUpdate(){
        if( this.query === this.props.query ) return;
        window.scrollTo(0, 0)
        this.query = this.props.query 
        this.setState({loading: true})
        this.elements = [];
        this.data = await this.fetchDataQuery()

        if(this.data.total === 0 ){
            this.setState({loading: false, success: false})
            return;
        }
        this.data.results.forEach(dataSet => {
            this.temporarilyUpdate.url = dataSet.urls.full; 
            this.temporarilyUpdate.alt = dataSet.alt_description; 
            this.temporarilyUpdate.likes = dataSet.likes; 
            this.temporarilyUpdate.data = dataSet

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
            <div key={k} className="card" style={{border: 'none', backgroundColor: 'transparent', margin: 'auto'}}>
                <figure className="figure responsive-mobile" id={k} >
                    <Link to={'/photo/statics/'+dataSet.id}> 
                        
                        <img id={k} className="mx-auto d-block img-fluid card-img-top" alt={alt} src={url} 
                        onError={ e => {
                            e.target.onError = null
                            e.target.src = '/david-pupaza-heNwUmEtZzo-unsplash.jpg'
                            e.target.alt = 'Failed to load Image'
                        }} />
                        
                    </Link>

                    
                        <div class="card-body">
                            <figcaption class="figure-caption">
                                
                                <Link style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}} 
                                to={'/user-profile/'+dataSet.user.username}>{dataSet.user.username.toUpperCase()}</Link>
                                <LikeButtons k={k} data={dataSet} />
                            </figcaption>
                        </div>
                   
                </figure> 
                </div>
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
    getDescription = (data, style) => {
        let arr = []
        data.tags.forEach( tag => {
            if(!!tag.source && arr.length <= 0 ){
                let str = tag.source.description || tag.source.title || tag.source.meta_description
                arr.push(str)                
            } else return
        })
        if(!arr[0]){ 
            let str = data.alt_description || data.description || data.user.bio || data.user.location || data.user.username
            return (<p style={this.state.textDisplay ? {mixBlendMode: 'different'} : {display: 'none'}} className="card-text text-white font-weight-light" >{str}</p>)
        }
        return (<p style={this.state.textDisplay ? {mixBlendMode: 'different'} : {display: 'none'}} className={"card-text text-white font-weight-light"} >{arr[0]}</p>)
    }

    render() {
        let sty = {backgroundColor:'rgba(35,35,35,.3)', backdropFilter:'blur(5px)'}
        let textBlendStyle = {mixBlendMode: 'different'}
        return (

            <React.Fragment>
                <NavBar />
                <div className="card bg-dark text-white"style={{borderRadius:'0', minHeight: '100px'}}>
                    { 
                        !this.state.errorLoading ? 
                        <img className="card-img" style={{borderRadius:'0'}} src={this.temporarilyUpdate.url} alt={this.temporarilyUpdate.alt} 
                        onError={e => this.handleError(e) }
                        />
                        : 
                        <img class="card-img" style={{borderRadius:'0'}} src={this.state.temporarilyUrl} alt={this.temporarilyUpdate.alt} 
                        onError={e => this.handleError(e) }
                        />                    
                    }

                <div class="card-img-overlay" style={{backgroundColor:'rgba(32,32,32,.4)', backdropFilter: 'blur(3px)', borderRadius:'0'}}>
                    <h1 className="card-title font-weight-normal text-white">{ !this.state.loading ? this.props.query.toUpperCase().replace(/[-]/g, ' ') : '' }</h1>
                    <hr class="my-4"/>
                    <p class="card-text text-white font-weight-bold" style={textBlendStyle}>{

                    !this.state.loading && this.state.success ?
                    this.temporarilyUpdate.data.user.name 
                    :this.state.loading ? '' : !this.state.loading && this.state.success === false ? 'Sorry, there are no Pictures' : '' }
                    </p>
                    { 
                    !this.state.loading && this.state.success ?
                    this.getDescription(this.temporarilyUpdate.data, textBlendStyle)
                    : this.state.loading ? '' : !this.state.loading && this.state.success === false ? 'We coudnt find any Pictures..' : ''
                    } 
                       
                </div>
                </div>


                <div style={{paddingTop: '20px', justifyContent: 'strech', backgroundColor: '#e1e2e2'}} 
                className="d-flex flex-wrap container-fluid">
                    {
                        this.state.loading && this.state.success === null ? <Loader />
                        : !this.state.success && !this.state.loading  ? <NoResults/> 

                        : this.state.elements.map( elem => {
                            return elem
                        })
                    }
                    
                </div>
                { !this.state.loading && this.state.success ? this.loadMoreButton() 
                : <div style={{width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                    <div className="alert alert-ligh" role="alert">Leider wurden keine weiteren Ergebnisse gefunden.</div></div>  
                    }
                { !this.state.loading ? <FooterComponent /> : <></>}
            </React.Fragment>
        )
    }
}


const LikeButtons = (props) => {
    const navigate = useNavigate()
    const [ liked, setLike ] = React.useState(props.data.liked_by_user)
    
    const handleLikeEvent = async (e) => {        
        e.preventDefault();
        setLike(!liked)

        if(!window.localStorage.getItem('access_token')){
            navigate('/user/authorization')

        } else {
            await Like({photo_id: props.data.id, token: window.localStorage.getItem('access_token'), liked: liked})                    
        }
    } 
    const generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }

    const handleDownloadEvent = (e) => {
        e.preventDefault();
        const key = generateKey();    

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

    return (
        <>
        <legend  htmlFor={props.k}><b>{props.data.likes+'    '}</b>
            {
                liked ? <i onClick={e => handleLikeEvent(e) }><i className="fas fa-heart" style={{cursor:'pointer'}}></i></i> 
                : <i onClick={e => handleLikeEvent(e) }><i  style={{cursor:'pointer'}} className="far fa-heart"></i></i> 
            }       
            <a className="btn-icons" rel="noreferrer" href={props.data.links.html} target="_blank" style={{color: 'black', marginLeft: '50px'}}>                 
                {<i className="fa fa-link" style={{color: 'white'}}></i>}
            </a>         
            <a className="btn-icons link-elem-icon"     
                onClick={ e => handleDownloadEvent(e) }
                href={props.data.urls.small_s3}
                target="_blank"
                download               
                rel="noreferrer"                                               
                style={{cursor:'pointer', marginLeft: '50px'}}
            >
                <i className="fas fa-cloud-download-alt" id={props.data.urls.small_s3} style={{color: 'white'}}></i>                     
            </a>
        </legend>
        </>
    )
}