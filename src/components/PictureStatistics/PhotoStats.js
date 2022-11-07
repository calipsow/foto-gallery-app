import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from './../Navbar/Navbar'
import FooterComponent from './../footer/footer';
import { Chart } from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend    
} from 'chart.js'
import Loader from './../loader/Loader';

export default function Photostats(){
    let { photo_id } = useParams()
    const [ query, setQuery ] = useState(photo_id)

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
        this.data = await this.fetchPhotData()
        this.photo = await this.fetchPhotoID()
        console.log(this.data, this.photo)
        this.setState({loading: false})
    } 


    fetchPhotoID = async () => {
        return await fetch('http://localhost:3588/api/search/photo-id?photoID='+this.props.photo_id)
        .then(response => response.json())
        .then(response => response.response)
        .catch(err => console.log(err))

    }

    fetchPhotData = async () => {
        return await fetch('http://localhost:3588/api/photo-lookup/statics?photoID='+this.props.photo_id)
        .then(response => response.json())
        .then(response => response.response)
        .catch(err => console.log(err))
    }


    render(){
        return(
            <div className="fluid-width" style={{ width:'100%', height: '100%'}}>
                <NavBar />
                {
                    !this.state.loading ?
                    <> 
                    <div className="card">

                    <div className="card-body">
                            <Link style={{textDecoration: 'none', color: 'black'}} to={'/user-profile/'+this.photo.user.username}> <h5 className="card-title">{this.photo.user.first_name+'  '+this.photo.user.last_name}</h5></Link>
                            <p className="card-text">{this.photo.user.bio || ''}</p>
                            <p className="card-text"><small className="text-muted">Overview</small></p>
                    </div>
                 
                    <img className="card-img-bottom" src={this.photo.urls.regular} alt={this.photo.alt_description || this.photo.exif.name || 'image'} />
                    </div>
                    <div className="fluid-width" >
                    
                        <Statistics data={this.data} />

                    </div>
                    <RelatedPhotos data={this.photo} />
                    </>
                    : <div style={{width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <Loader></Loader> </div>
                }
                <FooterComponent />
            </div>
        )
    }
}

const Statistics = (props) => {
    let data = props.data
    ChartJS.register(
        CategoryScale, LinearScale, PointElement, LineElement, Legend
    )

    let dowloadDate = [], dowloadValues = [], viewDate = [], viewValues = [], likesDate = [], likesValues = []

    data.downloads.historical.values.forEach( data => {
        dowloadDate.push( data.date )
        dowloadValues.push( parseInt( data.value ) )
    })
    

    data.views.historical.values.forEach( data => {
        viewDate.push( data.date )
        viewValues.push( parseInt(data.value) )
    })
    data.likes.historical.values.forEach( data => {
        likesDate.push( data.date )
        likesValues.push( parseInt(data.value) )
    })

    let dataSetDownloaded = {
        labels: dowloadDate,
        datasets: [ 
            {
                label: "Photo Downloads", data: dowloadValues, borderColor: "rgb(70,190,120)", backgroundColor: "black"
            }
        ]
    }
    let dataSetViews = {
        labels: viewDate,
        datasets: [ 
            {
                label: "Photo Views", data: viewValues, borderColor: "rgb(70,190,120)", backgroundColor: "black"
            }
        ]
    }
    let dataSetLikes = {
        labels: likesDate,
        datasets: [ 
            {
                label: "Photo Views", data: likesValues, borderColor: "rgb(70,190,120)", backgroundColor: "black"
            }
        ]
    }


    return (
        <>
        <div className="card w-100" style={{marginTop: '50px'}}>
            <div className="card-body">
            <h5 className="card-title">{'Downloads Total: '+data.downloads.total}</h5>
                <Chart type="line"  data={dataSetDownloaded} options={{responsive: true}} />


            </div>
        </div>

        <div className="card w-100" style={{marginTop: '50px'}}>
            <div className="card-body">
            <h5 className="card-title">{'Views Total: '+data.views.total}</h5>
                <Chart type="line"   data={dataSetViews} options={{responsive: true}} />


            </div>
        </div>

        <div className="card w-100" style={{marginTop: '50px'}}>
            <div className="card-body">
            <h5 className="card-title">{'Likes last 30 days: '+data.likes.total}</h5>
                <Chart type="line"   data={dataSetLikes} options={{responsive: true}} />


            </div>
        </div>
        
        </>
    )
}

const createElementImage = (url, alt, id) => {
    
    const handleEvent= (e) => {

        setTimeout(() => {
            window.location.reload()
        },50)
        
    }
    const generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }

    return(
        <Link to={'/photo/statics/'+id} onClick={e => handleEvent(e)} key={generateKey()}>
        <div class="card">
            
                <img class="card-img-top" src={url} alt={alt} />
            
            <div class="card-body">            
            </div>
            
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
            <div class="card-group" style={{marginTop: '50px'}}>
                { elements.length > 0 ? elements.map( el => el ) : <></> }
            </div>
    )
}