import React from 'react';
import {
    Routes,
    Route,
    Link,
    useNavigate,
} from 'react-router-dom';
import NavBar from './../Navbar/Navbar'
import FooterComponent from './../footer/footer';
import Loader from '../loader/Loader';
import UserPhotos from '../UserProfile/UserPhotos/UserPhotos';
import Statistics from '../assets/statics';
import LikedPhotos from '../UserProfile/LikedPhotos/LikedPhotos';
import UpdateInformation from './assets/UpdateInformation';

export default function CurrentUserProfile(){
    const navigate = useNavigate();
    const access_token = window.localStorage.getItem('access_token');
    const refresh_token = window.localStorage.getItem('refresh_token');

    React.useEffect(()=>{
        if( !access_token || !refresh_token ){
        
            navigate('/user/authorization')
        }
    },[])


    return (
        <CurrentUserProfileClass access_token={access_token} refresh_token={refresh_token}/>
    )
}


class CurrentUserProfileClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, menu_1: true, menu_2: false, menu_3: false, menu_4: false
        }
        this.stats = []
        this.userData = []
        this.handleClick = this.handleClick.bind(this)
    }
    async componentDidMount(){
        this.userData = await this.fetchCurrentUserProfile()
        this.stats = await this.fetchData()
        console.log(this.userData)
        this.setState({loading: false})
    }
    
    fetchData = async () => {
        return await fetch('http://localhost:3588/api/user-lookup/statics?userName='+this.userData.username)
        .then((response) => response.json())
        .then((response) => response.response)
        .catch((error) => console.error(error))
    }   

    fetchCurrentUserProfile = async () => {
        return await fetch('http://localhost:3588/api/user/authenticated/profile?token='+this.props.access_token)
        .then((response) => response.json())
        .then((response) => response.response)
        .catch((error) => console.error(error))
    }    
    handleClick = e => {
        e.preventDefault()
        if(e.target.id === 'menu-item-1' && !this.state.menu_1 ){
            this.setState({menu_1: true, menu_2: false, menu_3: false, menu_4: false})
        
        }else if(e.target.id === 'menu-item-2' && !this.state.menu_2){
            this.setState({menu_2: true, menu_1: false, menu_3: false, menu_4: false})
        
        }else if(e.target.id === 'menu-item-3' && !this.state.menu_3 ){
            this.setState({menu_2: false, menu_1: false, menu_3: true, menu_4: false})

        }else if(e.target.id === 'menu-item-4' && !this.state.menu_4 ){
            this.setState({menu_2: false, menu_1: false, menu_3: false, menu_4: true})
        }
    }
    render() {
        console.log(this.userData)
        if( this.state.loading ){
            return <Loader />
        }
        else return (
            <>
            <NavBar />

            <div className="container-fluid" style={{height: 'auto', minHeight: '100vh', margin: '0', padding: '0'}}>
                
                    <div className="container-fluid text-dark" style={{paddingTop: '20px', height: 'auto', minHeight: '250px', backgroundColor: 'var(--bg-light-white)'}}>
                    <div className="user-profile-image-container text-dark">
                            <img
                                id={this.userData.id}
                                className={'img-generatet'}
                                src={ this.userData.profile_image.large.split('/').includes('placeholder-avatars') ? '/icons8-name-64.svg' : this.userData.profile_image.large }
                                width={'115px'} height={'115px'}
                                style={{borderRadius: '100%'}}
                            >
                            </img>
                            <label htmmlFor={this.userData.id} className="profile-username-header text-dark">                            
                                    {this.userData.username}
                            </label>
                        </div>
                        <br/>
                        <div className="profile-info-container-header text-dark">
                            <p>{this.userData.bio || 'most logical parent container of the <ul>, or wrap a <nav> element around the whole navigation. Do not add the role to the <ul> itself, as this would prevent it from being'}</p>
                            <p>Followers <b>{this.userData.followers_count}</b></p>

                            <p className="profile-info-interesets">
                                
                                <br/>
                                {
                                    this.userData.tags.custom.lenght > 0 ?  this.userData.tags.custom.map( tag => {
                                        
                                        <Link to={'/search/query/'+tag.title} class="badge badge-secondary">{tag.title}</Link>

                                    }) : <span class="badge badge-pill badge-secondary">Tags</span>
                                }
                            </p>
                        </div>

                    </div>
                    <div className="container-fluid bg-light" style={{height: 'auto', minHeight: '100%'}}>
                        <ul className="nav nav-tabs">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" 
                                data-toggle="dropdown" 
                                href="#" 
                                role="button" 
                                aria-haspopup="true" 
                                aria-expanded="false">Menu</a>
                                
                                <div className="dropdown-menu">                                    
                                    <a className="dropdown-item" id="menu-item-3" href="#" onClick={e => this.handleClick(e) }>Likes</a>
                                    <a className="dropdown-item" id="menu-item-4" href="#" onClick={e => this.handleClick(e) }>Bearbeiten</a>
                                    <a className="dropdown-item" href="#">Stats</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Posten</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className={this.state.menu_1 ? "nav-link active" : 'nav-link '} id={'menu-item-1'} href="#" onClick={e => this.handleClick(e) }>Photos</a>
                            </li>
                            <li className="nav-item">
                                <a className={this.state.menu_2 ? "nav-link active" : 'nav-link '} id={'menu-item-2'} href="#" onClick={e => this.handleClick(e) }>Stats</a>
                            </li>

                        </ul>
                        {
                        this.state.menu_1 ? <div className="container" style={{marginBottom: '100px', paddingTop: '20px'}}> <UserPhotos username={ this.userData.username } /> </div>
                        : this.state.menu_2 ? <div className="container" style={{marginBottom: '100px'}}><Statistics dataSet={this.stats} url={'http://localhost:3588/api/user-lookup/statics?userName='+this.userData.username} /></div> 
                        : this.state.menu_3 ? <div className="container" style={{marginBottom: '100px' , paddingTop: '20px'}} > <LikedPhotos username={ this.userData.username } /> </div> 
                        : this.state.menu_4 ? <div className="container" style={{marginBottom: '100px', paddingTop: '20px'}} > <UpdateInformation data={ this.userData} /> </div> 
                        : null  
                        
                        }
                    </div>
               
            </div>
            <FooterComponent />
            </>
        )
    }

}