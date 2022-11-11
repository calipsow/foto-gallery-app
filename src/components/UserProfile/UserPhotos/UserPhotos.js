import React from 'react';
import './UserPhotos.css';
import Loader from './../../loader/Loader'
import NoResults from './../../assets/NoResults';
import { Link, useNavigate } from 'react-router-dom'
import Like from '../../assets/likes';
export default class UserPhotos extends React.Component {
    constructor(props){
        super(props);
        this.data = null
        this.elements = []
        this.state = {
            loading: true
        }
    }
    async componentDidMount(){
        this.data = await this.fetchUserPhotos()
        // console.log(this.data, 'aaaaaaaaaaaaaa')
        this.data.forEach( data => {

            this.elements.push(
                this.createElementImage(data.urls.small, data)
            )
        })
        this.setState({loading: false})
    }
    createElementImage = ( photoUrl, dataSet ) => {
        
        return (
            <div key={this.generateKey()}>
                                        
            <p  style={{textAlign: 'center', marginBottom: '0'}}>
                <Link to={'/photo/statics/'+dataSet.id}>
                <img className="rounded mx-auto d-block img-fluid" src={photoUrl} alt={dataSet.alt_description || 'picture'} 
                onError={ e => {
                    e.target.onError = null
                    e.target.src = '/david-pupaza-heNwUmEtZzo-unsplash.jpg'
                    e.target.alt = 'Failed to load Image'
                }}
                width={ 'auto' } height={'auto'} style={{margin: '20px', marginBottom: '0', maxWidth: '100%', height: 'auto'}}/></Link>
                                
            </p>
            
            <a className="btn-icons link-elem-icon"   
                        onClick={ e => this.handleDownloadEvent(e, dataSet) }
                        href={ dataSet.urls.small_s3 }
                        target="_blank"
                        download                                                              
                        style={{cursor:'pointer', marginLeft: '0'}}
                    >
            </a>
            <div className="card" style={{marginTop: '0', backgroundColor: 'transparent', border: 'none'}}>
                <div className="card-body" >
                    <div className="container-fluid d-flex flex-row justify-content-between">
                        <div onClick={ e => this.handleDownloadEvent(e, dataSet.urls.small_s3) } >
                            <i className="fas fa-cloud-download-alt" id={dataSet.urls.small_s3} style={{color: 'black', fontSize:'22px', cursor:'pointer'}} ></i>                                     
                        </div>
                        <div>
                            <LikeButton data={dataSet} />
                        </div>
                    </div>
                </div> 
            </div>
            </div>
        )
    }

    generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }


    fetchUserPhotos = async () => {
        return await fetch(`http://localhost:3588/api/user-lookup/photos?userName=${this.props.username}`,{'cors':'no-cors'})
        .then(response => response.json() )
        .then(response => response.response )
        .catch(err => {console.log(err); return [] } )
    }

     
    handleDownloadEvent = async (e, data) => {
        e.preventDefault();
        const key = this.generateKey();
        let url = await fetch(data.links.download_location+'&client_id=eya3GQorzQDbuRMRdnxRXH3I7qHaWNoGfuC_yIgNmEk')
        .then(response => response.json())
        .then(response => response.url)
        .catch(err => {console.log(err.message); return null})

        fetch(url, {
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
        return(
            <React.Fragment>
            {
                <div style={{justifyContent: 'space-around'}} className="picture-container-main">{this.state.loading 
                ? <Loader /> :  this.elements.length === 0 ? <NoResults /> : this.elements}</div> 
            }
            </React.Fragment>
            
        )
    }
}

const LikeButton = (props) => {
    const navigate = useNavigate()
    const [ liked, setLike ] = React.useState(props.data.liked_by_user)
    
   
    let firstSet = true


    const handleLikeEvent = async (e) => {        
        e.preventDefault();
        firstSet = false;
        setLike(!liked)

        if(!window.localStorage.getItem('access_token')){
            navigate('/user/authorization')

        } else {
            await Like({photo_id: props.data.id, token: window.localStorage.getItem('access_token'), liked: liked})
        }
    } 


    return (
        <div onClick={e => handleLikeEvent(e)} className="card-link">
            { liked ? <i className="fas fa-heart" style={{fontSize:'26px'}}></i> : <i style={{fontSize:'26px'}} className="far fa-heart"></i> }
            
        </div>
    )
}