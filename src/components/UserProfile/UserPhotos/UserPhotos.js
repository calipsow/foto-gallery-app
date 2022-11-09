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
            console.log(data)
            this.elements.push(
                this.createElementImage(data.urls.small, data)
            )
        })
        this.setState({loading: false})
    }
    createElementImage = ( photoUrl, dataSet ) => {
        
        return (
            <div key={this.generateKey()}>
                                        
            <p  style={{textAlign: 'center'}}>
                <Link to={'/photo/statics/'+dataSet.id}><img className="rounded mx-auto d-block img-fluid" src={photoUrl} alt="image" 
                width={ 'auto' } height={'auto'} style={{margin: '20px', maxWidth: '100%', height: 'auto'}}/></Link>
                                
            </p>
            <LikeButton data={dataSet} /> 
            <a className="btn-icons link-elem-icon"   
                        onClick={ e => this.handleDownloadEvent(e) }
                        href={dataSet.urls.small_s3}
                        target="_blank"
                        download                                                              
                        style={{cursor:'pointer', marginLeft: '0'}}
                    >
                    <i className="fas fa-cloud-download-alt" id={dataSet.urls.small_s3} style={{color: 'white'}}></i>                                     
                </a>

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
    const navi = useNavigate()
    const [ liked, setLike ] = React.useState(props.data.liked_by_user)
    React.useEffect(()=>{
        if(!window.localStorage.getItem('access_token')){
            navi('/user/authorization')
        }
    },[liked])


    const handleClick = async () => {
        setLike(!liked)

        await Like({token: window.localStorage.getItem('access_token'), photo_id: props.data.id, liked: liked})
    }

    return (
        <div onClick={e => handleClick(e)} >
            { liked ? <i className="fas fa-heart" style={{fontSize:'26px'}}></i> : <i style={{fontSize:'26px'}} className="far fa-heart"></i> }
            
        </div>
    )
}