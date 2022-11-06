import React from 'react';
import './UserPhotos.css';
import Loader from './../../loader/Loader'
import NoResults from './../../assets/NoResults';
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
                this.createElementImage(data.urls.small, data.likes, data)
            )
        })
        this.setState({loading: false})
    }
    createElementImage = ( photoUrl, likes, dataSet ) => {

        return (
            <p key={this.generateKey()} style={{textAlign: 'center'}}>
                <img className="rounded mx-auto d-block" src={photoUrl} alt="image" 
                width={ 'auto' } height={'auto'} style={{margin: '20px'}}/>
                <b>{likes+'    '}</b><i className="far fa-heart"></i>

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
        return(
            <React.Fragment>
            {
                <div style={{justifyContent: 'space-around'}} className="picture-container-main">{this.state.loading ? <Loader /> :  this.elements.length === 0 ? <NoResults /> : this.elements}</div> 
            }
            </React.Fragment>
            
        )
    }
}