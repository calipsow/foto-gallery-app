import React from 'react';
import { useParams } from 'react-router-dom'; 
import './UserProfile.css'
import NavBar from '../Navbar/Navbar';
import CollectionRend from './Collections/CollectionRender';
import UserPhotos from './UserPhotos/UserPhotos';
import LikedPhotos from './LikedPhotos/LikedPhotos';
class UserProfileClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            PhotoView: true, CollectionView: false, LikedPhotos: false
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
        
        this.data = await this.getUserProfile(this.user_id)
        this.createTags()
        this.setState({loading: false})
        console.log(this.data)
    }

    createTags = () => {
        
        this.data.tags.custom.forEach(tag => {
            this.tags.push(
                <code key={this.generateKey()} className={'code-tags'}>{tag.title}</code> 
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
        
            this.setState({PhotoView: true, LikedPhotos: false, CollectionView: false})
        
        }else if(e.target.id === "Liked-List-Item" && !this.state.LikedPhotos ){
            this.setState({PhotoView: false, LikedPhotos: true, CollectionView: false})
        
        }else if(e.target.id === "Collection-List-Item" && !this.state.CollectionView ){

            this.setState({PhotoView: false, LikedPhotos: false, CollectionView: true})
        }
    }
    render(){
        return (
            <React.Fragment>
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
                        <div className="profile-info-container-header">
                            <p>{this.data.bio}</p>
                            <p>Followers {this.data.followers_count}</p>

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
                                <li className="list-group-item user-profile-menu-li" style={this.state.PhotoView ? {color: 'white', backgroundColor: 'transparent'}:{color: 'black', backgroundColor: 'transparent'}}
                                    id="Photos-List-Item"
                                    onClick={ e => this.handleViewChange(e) }
                                >Photos</li>
                                <li className="list-group-item user-profile-menu-li" style={this.state.LikedPhotos ? {color: 'white', backgroundColor: 'transparent'}:{color: 'black', backgroundColor: 'transparent'}}
                                    id="Liked-List-Item"
                                    onClick={ e => this.handleViewChange(e) }
                                >Likes</li>
                                <li className="list-group-item user-profile-menu-li" style={this.state.CollectionView ? {color: 'white', backgroundColor: 'transparent'}:{color: 'black', backgroundColor: 'transparent'}}
                                    id="Collection-List-Item"
                                    onClick={ e => this.handleViewChange(e) }
                                >Collections</li>
                            </ul>
                        </div>
                        {
                            this.state.PhotoView ? <UserPhotos username={this.data.username}/> : this.state.LikedPhotos ? <LikedPhotos username={this.data.username}></LikedPhotos> : this.state.CollectionView ? <CollectionRend username={this.data.username}/> : <UserPhotos />
                        }
                    </div>
                </>
                : <></>
                }
            </React.Fragment>
        )
    }

}




export default function UserProfile () {

    const { user_id } = useParams()
    console.log(user_id)
    return (
        <UserProfileClass user_id={user_id} />
    )
}

