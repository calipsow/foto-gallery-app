import React from 'react';
import { useParams } from 'react-router-dom'; 
import './UserProfile.css'
import NavBar from '../Navbar/Navbar';

class UserProfileClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            PhotoView: true, CollectionView: false, LikedPhotos: false
        }
        this.data = null;       
        this.tags = []

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
                                { this.data.badge.slug === 'verified' ? <i className="fas fa-check-circle">{'      '+ this.data.name}</i> : this.data.name  }
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
                            <ul className="user-profile-menu-ul">
                                <li className="user-profile-menu-li">Photos</li>
                                <li className="user-profile-menu-li">Likes</li>
                                <li className="user-profile-menu-li">Collections</li>
                            </ul>
                        </div>
                        {
                            this.state.PhotoView ? <UserPhotos /> : this.state.LikedPhotos ? <></> : this.state.CollectionView ? <></> : <UserPhotos />
                        }
                    </div>
                </>
                : <></>
                }
            </React.Fragment>
        )
    }

}

class UserPhotos extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <section className="userPhotos-container-main picture-container">

            </section>
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

