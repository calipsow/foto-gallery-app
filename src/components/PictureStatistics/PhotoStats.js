import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from './../Navbar/Navbar'
import FooterComponent from './../footer/footer';
import Statistics from './../assets/statics';
import Loader from './../loader/Loader';
import DownloadButton from './../assets/downloadButton';

export default function Photostats(){
    let { photo_id } = useParams()
    const [ query, setQuery ] = useState(photo_id)
    window.scrollTo(0, 0)
    useEffect(()=>{

        setQuery(photo_id)
    
    },[photo_id])

    return(
        <PhotostatsClass photo_id={query} />
    )
}

class PhotostatsClass extends React.Component {
    constructor(props){
        super(props)
        this.data = []; this.photo = []
        this.state = {
            loading: true
        }
    }
    async componentDidMount(){
        window.scrollTo(0, 0)
        this.photo = await this.fetchPhotoID()

        this.setState({loading: false})
    } 


    fetchPhotoID = async () => {
        return await fetch('http://localhost:3588/api/search/photo-id?photoID='+this.props.photo_id)
        .then(response => response.json())
        .then(response => response.response)
        .catch(err => console.log(err))

    }



    render(){

        return(
            <div className="fluid-width" style={{ width:'100%', height: '100%', backgroundColor: '#e1e2e2'}}>
                <NavBar />
                {
                    !this.state.loading ?
                    <> 
                    <div className="card">

                    <div className="card-body">
                        <div className="user-profile-image-container" style={{marginLeft: '0'}}>
                        <Link style={{textDecoration: 'none', color: 'black'}} to={'/user-profile/'+this.photo.user.username}> 
                            <img
                                alt={this.photo.username}
                                id={this.photo.id}
                                className={'img-generatet'}
                                src={ this.photo.user.profile_image.large }
                                width={'115px'} height={'115px'}
                                style={{borderRadius: '100%'}}
                            >
                            </img>
                        </Link>
                            <label htmlFor={this.photo.id} className="profile-username-header">                            
                                { this.photo.badge === undefined || null 
                                ? this.photo.name 
                                : this.photo.badge.slug === 'verified' 
                                ? <i className="fas fa-check-circle">{'      '+ this.photo.name}</i> : this.data.name  }
                            </label>
                            </div>

                        <Link style={{textDecoration: 'none', color: 'black'}} 
                        to={'/user-profile/'+this.photo.user.username}> <h5 className="card-title">{this.photo.user.first_name+'  '+this.photo.user.last_name}</h5></Link>
                        <p className="card-text">{this.photo.user.bio || ''}</p>
                        <p className="card-text"><small className="text-muted">Overview</small></p>
                        <DownloadButton data={this.photo} />
                    </div>
                        <img 
                        className="img-fluid" src={this.photo.urls.full} 
                        alt={this.photo.alt_description || this.photo.exif.name || 'image'} />
                        
                    
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-text text-center">Photo Trends</h2>
                        </div>
                    </div>
                    <div className="container fluid-width" >                                        
                        <Statistics url={'http://localhost:3588/api/photo-lookup/statics?photoID='+this.props.photo_id} />
                    </div>
                    <PhotoInforamtion data={this.photo} />
                    <RelatedPhotos data={this.photo} />
                    </>
                    : <div style={{width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <Loader></Loader> </div>
                }
                <FooterComponent />
            </div>
        )
    }
}



const PhotoInforamtion = (data) => {

    const colSttyles = {
        marginTop: '30px', padding: '30px', borderRadius: '5px'
    }
    return(
        <div className="container">
            <div className="column">
                <div className="col text-white bg-dark" style={colSttyles}>
                    <div className="media text-white bg-dark" >
                        <img className="mr-3" src={'/icons8-heart-64.svg'} alt="Like"/>
                        <div className="media-body">
                            <h5 className="mt-0">{ 'Likes' }</h5>
                            <h5 className="mt-0">{ data.data.likes }</h5>
                            Hier siehst du sämtliche, seid der Veröffentlichung, bekommenen Likes von Nutzern der Unsplash Platform. 
                        </div>
                    </div>
                </div>
                <div className="col text-white bg-dark" style={colSttyles}>
                <div className="media text-white bg-dark" >
                        <img className="mr-3" src={'/icons8-scroll-down-64.svg'} alt="Download"/>
                        <div className="media-body">
                            <h5 className="mt-0">{'Downloads'}</h5>
                            <h5 className="mt-0">{ data.data.downloads }</h5>

                            <p className="font-weight-light">
                                Jeder Download auf Unsplash wird registriert und gezählt, hier ist die Summe aller Downloads jemals.    
                            </p> 
                        </div>
                    </div>
                    
                </div>
                <div className="col text-white bg-dark" style={colSttyles}>
                <div className="media text-white bg-dark" >
                        <img className="mr-3" src={'/icons8-cbs-64.svg'} alt="Views"/>
                        <div className="media-body">
                            <h5 className="mt-0">{'Views' }</h5>
                            <h5 className="mt-0">{ data.data.views }</h5>
                            <p className="font-weight-light">
                                Durch das Aufrufen des Bildes auf Unsplash wird ein neuer View erzeugt und zur Summe der totalen Views gezählt.

                            </p>
                        </div>
                    </div>
                    
                </div>
                <div className="col text-white bg-dark" style={colSttyles}>
                <div className="media text-white bg-dark">
                        <img className="mr-3" src={'/icons8-bar-chart-64.svg'} alt="Views"/>
                        <div className="media-body">
                            <h5 className="mt-0">{ 'Download Rate' }</h5>
                            <h5 className="mt-0">{ (data.data.downloads / data.data.views) > 0.000001 
                            ? (data.data.downloads / data.data.views).toFixed(7) : 'Rate not available' }</h5>
                            <p className="font-weight-light">

                            Die Download Rate gibt an wie oft das Foto pro Ansicht gedownloaded wurde. Unter Umständen sind diese Daten noch nicht verfügbar. 
                            </p>
                        </div>
                    </div>
                    
                </div>
                <div className="w-100"></div>
                
            </div>
        </div>
    )
}

const createElementImage = (url, alt, id) => {
    
    const handleEvent= (e) => {

        setTimeout(() => {
            window.scrollTo(0, 0)
            window.location.reload()
        },50)
        
    }
    const generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }

    return(
        <Link to={'/photo/statics/'+id} onClick={e => handleEvent(e)} key={generateKey()}>
        <div className="card" style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'transparent', marginBottom:'50px'}}>
            
                <img className="card-img-top" src={url} alt={alt} />
            
        </div>
        </Link>

    )
}

const RelatedPhotos = (props) => {
    let elements = []
    if(props.data.related_collections.results.length > 0 ){
        props.data.related_collections.results.forEach( related_img => {
            elements.push(createElementImage(related_img.cover_photo.urls.small, related_img.cover_photo.alt_description || '', related_img.cover_photo.id))
        })
    }

 
    return (
        <div style={{marginTop: '150px', backgroundColor: 'traparent'}} className="container-fluid fluid-width">
            <div className="card">
            <div className="card-body" >
                <p className="card-text text-center">Ähnliche Bilder</p>
            </div>
            </div>
        
            <div className="container fluid-width card-group" style={{marginTop: '50px'}}>
                
                { elements.length > 0 ? elements.map( el => el ) : <></> }
                
            </div>
        </div>
    )
}