import React from 'react';
import './UserPhotos.css';


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
    createElementImage = ( photoUrl, likes ) => {

        return (
            <p key={this.generateKey()} style={{textAlign: 'center'}}>
                <img className="rounded mx-auto d-block" src={photoUrl} alt="image" 
                width={ 'auto' } height={'auto'} style={{margin: '20px'}}/>
                <b>{likes+'    '}</b><i className="far fa-heart"></i>
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

    render() {
        return(
            <React.Fragment>
            {
                this.state.loading ? <div>Loading...</div> : <div style={{justifyContent: 'space-around'}} className="picture-container-main">{this.elements}</div> 
            }
            </React.Fragment>
            
        )
    }
}