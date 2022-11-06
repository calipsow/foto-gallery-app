import React from 'react';
import './LikedPhotos.css'
import Loader from '../../loader/Loader'
import NoResults from './../../assets/NoResults';
export default class LikedPhotos extends React.Component {
    constructor(props){
        super(props);
        this.data = []
        this.elements = []
        this.state = {
            loading: true
        }
    }
    async componentDidMount(){
        this.data = await this.fetchData()
        // console.log(this.data)
        this.data.forEach(dataSet => {
            this.elements.push(this.createElementImage(
                dataSet.urls.small, dataSet.alt_description || 'image', dataSet.likes, dataSet
            ))
        })
        this.setState({loading: false})
    }

    fetchData = async () => {
        return await fetch(`http://localhost:3588/api/user-lookup/likes?userName=${this.props.username}`,{'cors':'no-cors'})
        .then(response => response.json())
        .then(response => response.response )
        .catch(err => {console.error(err); return[]})
    }

    createElementImage = (url, alt, likes, dataSet) => {
        const k = this.generateKey()
        return(
            <p key={k} style={{textAlign: 'center', margin: '15px'}}>
                <img id={k} className="rounded mx-auto d-block img-fluid" alt={alt} src={url} />
                <legend htmmlFor={k}><b>{likes+'    '}</b><i className="far fa-heart"></i></legend>
                <a className="btn-icons link-elem-icon"     
                        onClick={ e => this.handleDownloadEvent(e) }
                        href={dataSet.urls.small_s3}
                        target="_blank"
                        download                                                              
                        style={{cursor:'pointer'}}
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

    render(){
        return(
            <React.Fragment>
            {
                <div style={{paddingTop: '20px', justifyContent: 'center', backgroundColor: '#e1e2e2'}} className="d-flex align-content-around flex-wrap">{this.state.loading ? <Loader /> : this.elements.length === 0 ? <NoResults /> : this.elements}</div>
            }
            </React.Fragment>
        ) 
    }
}