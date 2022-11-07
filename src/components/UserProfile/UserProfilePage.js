import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import './UserProfile.css'
import NavBar from '../Navbar/Navbar';
import Loader from './../loader/Loader';
import UserPhotos from './UserPhotos/UserPhotos';
import LikedPhotos from './LikedPhotos/LikedPhotos';
import FooterComponent from './../footer/footer';
import { Line } from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend    
} from 'chart.js'
class UserProfileClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            PhotoView: true, LikedPhotos: false, Statistics: false
        }
        this.data = null;       
        this.tags = []
        this.handleViewChange = this.handleViewChange.bind(this)
    }
    getUserProfile = async () => {
        console.log(this.props.user_id)
        return await fetch('http://localhost:3588/api/user-lookup?userName='+this.props.user_id,{'cors':'no-cors'})
        .then(response =>  response.json())
        .then(response => response.response )
        .catch(err => console.log(err) )
    }
    async componentDidMount(){
        window.scrollTo(0, 0)
        this.data = await this.getUserProfile(this.user_id)
        this.createTags()
        this.setState({loading: false})
        console.log(this.data)
    }

    createTags = () => {
        
        this.data.tags.custom.forEach(tag => {
            this.tags.push(

                <Link to={`/search/query/${tag.title}`}>
                    <code key={this.generateKey()} className={'code-tags'}>{tag.title}</code>
                </Link> 
            )
        })
        
    }
    generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }
    handleViewChange = (e) => {
        e.preventDefault();

        if(e.target.id === "Photos-List-Item" && !this.state.PhotoView ){
        
            this.setState({PhotoView: true, LikedPhotos: false, Statistics: false})
        
        }else if(e.target.id === "Liked-List-Item" && !this.state.LikedPhotos ){
            this.setState({PhotoView: false, LikedPhotos: true, Statistics: false})
        
        }else if(e.target.id === 'Statistics-List-Item' && !this.state.Statistics){
            this.setState({Statistics: true, LikedPhotos: false, PhotoView: false})
        }
    }
    render(){
        return (
            <div>
                <NavBar />
                { !this.state.loading ?
                <> 
                    <div className="user-profile-header">
                        <div className="user-profile-image-container">
                            <img
                                id={this.data.id}
                                className={'img-generatet'}
                                src={ this.data.profile_image.large }
                                width={'115px'} height={'115px'}
                                style={{borderRadius: '100%'}}
                            >
                            </img>
                            <label htmmlFor={this.data.id} className="profile-username-header">                            
                                { this.data.badge === null ? this.data.name : this.data.badge.slug === 'verified' ? <i className="fas fa-check-circle">{'      '+ this.data.name}</i> : this.data.name  }
                            </label>
                        </div>
                        <br/>
                        <div className="profile-info-container-header">
                            <p>{this.data.bio}</p>
                            <p>Followers <b>{this.data.followers_count}</b></p>

                            <p className="profile-info-interesets">
                                
                                <br/>
                                {
                                    this.tags
                                }
                            </p>
                        </div>
                    </div>

                    <div className="user-profile-main-container">
                        <div className="user-profile-menu-item">
                            <ul className="user-profile-menu-ul list-group list-group-flush">
                                <li className="list-group-item user-profile-menu-li" style={this.state.PhotoView ? {color: 'gray', backgroundColor: 'transparent'}:{color: 'black', backgroundColor: 'transparent'}}
                                    id="Photos-List-Item"
                                    onClick={ e => this.handleViewChange(e) }
                                >Photos</li>
                                <li className="list-group-item user-profile-menu-li" style={this.state.LikedPhotos ? {color: 'gray', backgroundColor: 'transparent'}:{color: 'black', backgroundColor: 'transparent'}}
                                    id="Liked-List-Item"
                                    onClick={ e => this.handleViewChange(e) }
                                >Likes</li>
                                <li className="list-group-item user-profile-menu-li" style={this.state.Statistics ? {color: 'gray', backgroundColor: 'transparent'}:{color: 'black', backgroundColor: 'transparent'}}
                                    id="Statistics-List-Item"
                                    onClick={ e => this.handleViewChange(e) }
                                >Statistics</li>
                            </ul>
                        </div>
                        {
                            this.state.PhotoView ? <UserPhotos username={this.data.username}/> : this.state.LikedPhotos ? <LikedPhotos username={this.data.username}></LikedPhotos> : this.state.Statistics ? <UserStatistics username={this.data.username}/> : <UserPhotos username={this.data.username}/>
                        }
                    </div>
                </>
                : <Loader></Loader>
                }
                { !this.state.loading ? <FooterComponent /> : <></>}
            </div>
        )
    }

}




export default function UserProfile () {

    const { user_id } = useParams()

    return (
        <UserProfileClass user_id={user_id} />
    )
}
class UserStatistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loading: true }
        this.dowloadDate = []; this.dowloadValues = []; this.viewDate = []; this.viewValues = []
        ChartJS.register(
            CategoryScale, LinearScale, PointElement, LineElement, Legend
        )
    }

    fetchData = async () => {
        return await fetch('http://localhost:3588/api/user-lookup/statics?userName='+this.props.username)
        .then(res => res.json())
        .then(res => res.response)
        .catch(err => console.log(err))
    }

    async componentDidMount(){
        this.data = await this.fetchData()

        this.data.downloads.historical.values.forEach( data => {
            this.dowloadDate.push( data.date )
            this.dowloadValues.push( parseInt( data.value ) )
        })
        

        this.data.views.historical.values.forEach( data => {
            this.viewDate.push( data.date )
            this.viewValues.push( parseInt(data.value) )
        })

        this.dataSetDownloaded = {
            labels: this.dowloadDate,
            datasets: [ 
                {
                    label: "Photo Downloads", data: this.dowloadValues, borderColor: "black", backgroundColor: "black"
                }
            ]
        }
        this.dataSetViews = {
            labels: this.viewDate,
            datasets: [ 
                {
                    label: "Photo Views", data: this.viewValues, borderColor: "black", backgroundColor: "black"
                }
            ]
        }

        this.setState({loading: false})
    }

    chartDia = (data) => {
        return(
            <Line data={data} options={{responsive: true}} />
        )
    }


    render() {
        return (
            <div className="container" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className="card" style={{width: "100%", marginTop: '50px'}}>
                { this.state.loading ? <></> : this.chartDia(this.dataSetDownloaded) }
            </div>
            <div className="card" style={{width: "100%", marginTop: '50px', marginBottom: '50px'}}>

            { this.state.loading ? <></> : this.chartDia(this.dataSetViews) }
                
            </div>
            </div>
        )
    }
}

