import React from 'react';
import './Constructor.css'

export default class PictureConstruction extends React.Component{
    constructor(props) { super(props); this.data = this.props.data; this.imageData={
        url: null, userName: null, location: null, likes: null, social: null
    }; }

    render() { 

        return(
            <>
            <div className="picture-container" style={{backgroundImage: `url(${this.props.data.urls.regular})`}}>
                <p>Creator: {this.props.data.user.username} </p><br/>
                <p>
                    Likes: {this.props.data.likes}
                </p><br/>

                <p>Social: {

                this.props.data.user.social.instagram_username !== null ? 'Instagram: ' + this.props.data.user.social.instagram_username 
                : this.props.data.user.social.twitter_username !== null ? 'Twitter: ' + this.props.data.user.social.twitter_username 
                : this.props.data.user.social.portfolio_url !== null ? 'Portfolio: '+ this.props.data.user.social.portfolio_url 
                : 'No Social Account..'                
                }</p>
            </div>
            <br/>
            </>
        ) 
    }
}