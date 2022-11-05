import React from 'react';
import './PictureRend.css'
import { Link } from 'react-router-dom'

export default class PictureRend extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            elements: [],
            loading: true
        }
        this.data = []; this.elements = [];
        // this.handleDownloadEvent = this.handleDownloadEvent.bind(this);
    }
    async componentDidMount(){
        this.data = await this.fetchData();
        // console.log(this.data);
        this.data.forEach( dataSet => {
            this.elements.push(
                this.createElement(dataSet)
            )
        })

        this.setState({ elements: this.elements })
    }

    createElement = (dataSet) => {
        var uid = this.generateKey()
        const keys = Object.keys(dataSet.urls)

        var srcSet = "" 
        keys.forEach( key => {
            if(key === 'raw' || key === 'small_s3') return;
            srcSet += dataSet.urls[key] + key === 'thumb' ? dataSet.urls[key]+' 200w, ' : key === 'small' ? dataSet.urls[key]+' 400w, ' : key === 'regular' ? dataSet.urls[key]+' 1080w, ' : key === 'full' ? dataSet.urls[key]+' 2080w, ' : '' 
        })
        // console.log(srcSet)
        
        return (
            <div key={uid} className="container-item">
                <div className="container-user-info">
                    <Link to={'/user-profile/'+dataSet.user.username} style={{textDecoration: 'none', cursor: 'pointer'}}>
                        <img
                            id={uid}
                            src={dataSet.user.profile_image.medium}
                            width={'64px'}
                            height={'64px'}
                            style={{borderRadius: '100%', border:'none'}}
                        >                    
                        </img>
                        
                        
                    </Link>
                    <label htmlFor={uid} className="thumbnail-label">{dataSet.user.name}</label>   
                </div>

                <div className="picture-container" >

                
                <p >
                <img 
                    width={'100%'}
                    height={'100%'}
                    sizes={'(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw'}
                    srcSet={srcSet}
                    className="img-generatet rounded mx-auto d-block"
                    id={uid}
                    src={ dataSet.urls.small.split('&').includes('w=400') ? dataSet.urls.regular : dataSet.urls.small }
                    alt={ dataSet.user.name }                
                ></img>
                {dataSet.user.samsungmemory}
                </p>

                </div>
                <div className="button-container">
                    <button className="btn-icons">
                        {dataSet.likes+'    '}<i className="far fa-heart"></i>
                    </button>
                    {/*
                    <a className="btn-icons link-elem-icon"     
                        onClick={ e => this.handleDownloadEvent(e) }
                        href={dataSet.links.download}
                        target="_blank"
                        download                                                              
                        style={{cursor:'pointer'}}
                    >
                        <i className="fas fa-download" id={dataSet.links.download} ></i>

                     
                    </a> */ }
                    
                    <button className="btn-icons">
                        <i className="fas fa-share"></i>
                    </button>

                </div>
            </div>
        )
    }
/* https://unsplash.com/photos/6kajEqr84iY/download?ixid=MnwzNzY2ODV8MXwxfGFsbHwxfHx8fHx8Mnx8MTY2NzMxNzE1Nw
    handleDownloadEvent = (e) => {
        e.preventDefault();
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
            link.setAttribute("download", this.generateKey()+'.png'); //or any other extension
            document.body.appendChild(link);
            link.click();
            });
        })
        .catch(err => {
            console.log(err);
        });
        
    }
*/

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

