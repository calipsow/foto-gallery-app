import React from 'react';
import './PictureRend.css'
import axios from 'axios'

export default class PictureRend extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            elements: [],
            loading: true
        }
        this.data = []; this.elements = [];
        this.handleDownloadEvent = this.handleDownloadEvent.bind(this);
    }
    async componentDidMount(){
        this.data = await this.fetchData();
        console.log(this.data);
        this.data.forEach( dataSet => {
            this.elements.push(
                this.createElement(dataSet)
            )
        })

        this.setState({ elements: this.elements })
    }

    createElement = (dataSet) => {
        var uid = this.generateKey()
        return (
            <div key={uid} className="container-item">
                <div className="container-user-info">
                    
                    <img
                        id={uid}
                        src={dataSet.user.profile_image.medium}
                        width={'64px'}
                        height={'64px'}
                        style={{borderRadius: '100%', border:'none'}}
                    >                    
                    </img>
                    
                    <label for={uid} className="thumbnail-label">{dataSet.user.name}</label>   
                    

                </div>

                <div className="picture-container" >

                
                <p >
                <img 
                    width={'100%'}
                    height={'auto'}
                    className="img-generatet"
                    id={uid}
                    src={window.innerWidth < 480 ? dataSet.urls.small_s3 : dataSet.urls.small }
                    alt={dataSet.user.name}                
                ></img>
                {dataSet.user.bio}
                </p>

                </div>
                <div className="button-container">
                    <button className="btn-icons">
                        {dataSet.likes+'    '}<i className="far fa-heart"></i>
                    </button>

                    <button className="btn-icons"     
                        onClick={ e => this.handleDownloadEvent(e) }                                      
                        style={{cursor:'pointer'}}
                    >
                        <i className="fas fa-download" id={dataSet.links.download} ></i>

                     
                    </button> 
                    
                    <button className="btn-icons">
                        <i className="fas fa-share"></i>
                    </button>

                </div>
            </div>
        )
    }

    handleDownloadEvent = (event) => {
        event.preventDefault();
        var url = event.target.id;
        console.log(url)
        axios({
            url: url,
            method:'GET',
            responseType: 'blob',
            credentials:"include"
            })
            .then((response) => {
                  const url = window.URL
                  .createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', this.generateKey()+'_.jpg');
                  document.body.appendChild(link);
                  link.click();
            }).catch((error) => {console.error(error)})
    }


    generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }

    fetchData = async () => {
        return await fetch('http://localhost:3588/api/pictures-random',{method: 'GET',headers: {'Content-Type': 'application/json','cors':'no-cors'}})
        .then(response =>  response.json() )
        .then(response =>  response.response )
        .catch(err => [err] )
    } 


    render() {
        return (
            <div className="picture-container-main">{this.state.elements}</div>
        )
    }
}

