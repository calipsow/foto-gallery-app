import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from './../Navbar/Navbar'
import FooterComponent from './../footer/footer';
import { Chart } from 'react-chartjs-2'
import Trend from 'react-trend'
import Statistics from './../assets/statics';


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
                    <div className="container fluid-width" >
                    
                        
                        <Statistics url={'http://localhost:3588/api/photo-lookup/statics?photoID='+this.props.photo_id} />
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
/*
const Statistics__ = (props) => {

    const [ data, setData ] = useState(props.data)
    let dowloadDate = [], dowloadValues = [], viewDate = [], viewValues = [], likesDate = [], likesValues = []

    ChartJS.register(
        CategoryScale, LinearScale, PointElement, LineElement, Legend
    )

    useEffect(()=>{

        dowloadDate = []; dowloadValues = []; viewDate = []; viewValues = []; likesDate = []; likesValues = []

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
        
    },[props])

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
    

    return (
        <>
        <div className="card w-100 text-white bg-dark" style={{marginTop: '50px'}}>
            <div className="card-body">
            <h5 className="card-title" style={{marginLeft: '50px'}}>{'Downloads Trend: '+data.downloads.total}</h5>
                <Trend type="line"  data={dowloadValues} gradient={['#fff','#ddd','#eee']} padding={1.5} 
                 smooth autoDraw autoDrawDuration={300} autoDrawEasing="ease-out" radius={1.5} strokeWidth={0.7} strokeLinecap={'butt'}
                />
                <p className="card-text" style={{marginLeft: '50px', marginTop: '50px'}}>
                    <span className="align-baseline">{
                        dowloadDate.shift().split('-')[2]+'.'+dowloadDate.shift().split('-')[1]+'.'+dowloadDate.shift().split('-')[0]+'   -    '+dowloadDate.pop().split('-')[2]+'.'+dowloadDate.pop().split('-')[1]+'.'+dowloadDate.pop().split('-')[0]
                    }</span>
                </p>

            </div>
        </div>

        <div className="card w-100 text-white bg-dark" style={{marginTop: '50px'}}>
            <div className="card-body">
            <h5 className="card-title" style={{marginLeft: '50px'}}>{'Views Trend: '+data.views.total}</h5>
                <Trend type="line"   data={viewValues} gradient={['#fff','#ddd','#eee']} padding={1.5} 
                 smooth autoDraw autoDrawDuration={300} autoDrawEasing="ease-out" radius={1.5} strokeWidth={0.7} strokeLinecap={'butt'} />
                
                <p className="card-text" style={{marginLeft: '50px', marginTop: '50px'}}>
                    <span className="align-baseline">{
                        viewDate.shift().split('-')[2]+'.'+viewDate.shift().split('-')[1]+'.'+viewDate.shift().split('-')[0]+'   -    '+viewDate.pop().split('-')[2]+'.'+viewDate.pop().split('-')[1]+'.'+viewDate.pop().split('-')[0]
                    }</span>
                </p>

            </div>
        </div>

        <div className="card w-100 text-white bg-dark" style={{marginTop: '50px'}}>
            <div className="card-body">
            <h5 className="card-title" style={{marginLeft: '50px'}}>{'Likes Trend last 30 days: '+data.likes.total}</h5>
                <Trend type="line"   data={likesValues} gradient={['#fff','#ddd','#eee']} padding={1.5} 
                 smooth autoDraw autoDrawDuration={300} autoDrawEasing="ease-out" radius={1.5} strokeWidth={0.7} strokeLinecap={'butt'} />

                <p className="card-text" style={{marginLeft: '50px', marginTop: '50px'}}>
                    <span className="align-baseline">{
                        likesDate.shift().split('-')[2]+'.'+likesDate.shift().split('-')[1]+'.'+likesDate.shift().split('-')[0]+'   -    '+likesDate.pop().split('-')[2]+'.'+likesDate.pop().split('-')[1]+'.'+likesDate.pop().split('-')[0]
                    }</span>
                </p>

            </div>
        </div>
        
        </>
    )
}
*/
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
        <div className="card">
            
                <img className="card-img-top" src={url} alt={alt} />
            
            <div className="card-body">            
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
        <div style={{marginTop: '150px'}} className="container fluid-width">
            <div class="card">
            <div class="card-body">
                <p className="card-text text-center">Ähnliche Bilder</p>
            </div>
            </div>
        
            <div className="container fluid-width card-group" style={{marginTop: '50px'}}>

                { elements.length > 0 ? elements.map( el => el ) : <></> }
            </div>
        </div>
    )
}