import React from 'react';
import { useParams } from 'react-router-dom'
import './SearchSite.css'
import 'jquery/dist/jquery.min.js'; // Have to install and import jQuery because of bootstrap modal's dependency
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from '../Navbar/Navbar';
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader';

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
            loading: true, success: null
        }
        this.loadPages = 0
        this.data = []
        this.temporarilyUpdate = {}
        this.elements = []
    }
    async componentDidMount(){
        window.scrollTo(0, 0)
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
        this.setState({loading: false, success: true})
    }

    fetchDataQuery = async () => {
        return await fetch(`http://localhost:3588/api/search/photos?query=${this.props.query}`,{'cors':'no-cors'})
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
                <img id={k} className="rounded mx-auto d-block img-fluid" alt={alt} src={url} />
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
                
            </p>
        )
    }
 
    handleDownloadEvent = (e) => {
        e.preventDefault();
        const key = this.generateKey();
        console.log(e.target.id)
        console.log(e.target.id)

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

    render() {

        return (

            <React.Fragment>
                <NavBar />

                <div className="header-container-main">
                    <img 
                    src={this.temporarilyUpdate.url}
                    alt={this.temporarilyUpdate.alt} width={"100%"} height={"auto"} ></img>
                
                    <h1 className="title-main">{this.props.query.toUpperCase()}</h1>
                </div>

                <div style={{paddingTop: '20px', justifyContent: 'center', backgroundColor: '#e1e2e2'}} className="d-flex align-content-around flex-wrap">
                    {
                        this.state.loading && this.state.success === null ? <Loader />
                        : !this.state.success && !this.state.loading  ? <div>No Results</div> 
                        : this.elements                
                    }
                </div>
            </React.Fragment>
        )
    }
}