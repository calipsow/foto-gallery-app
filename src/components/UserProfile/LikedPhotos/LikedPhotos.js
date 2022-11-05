import React from 'react';
import './LikedPhotos.css'


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
                dataSet.urls.small, dataSet.alt_description || 'image', dataSet.likes
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

    createElementImage = (url, alt, likes) => {
        const k = this.generateKey()
        return(
            <p key={k} style={{textAlign: 'center', margin: '15px'}}>
                <img id={k} className="rounded mx-auto d-block img-fluid" alt={alt} src={url} />
                <legend htmmlFor={k}><b>{likes+'    '}</b><i className="far fa-heart"></i></legend>
            </p>
        )
    }
    generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }


    render(){
        return(
            <React.Fragment>
            {
                this.state.loading ? <div>Loading...</div> : <div style={{marginTop: '20px', justifyContent: 'center'}} className="d-flex align-content-around flex-wrap">{this.elements}</div>
            }
            </React.Fragment>
        ) 
    }
}