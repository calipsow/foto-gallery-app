import React,{ useEffect, useState, useParams } from 'react';
import NavBar from './../Navbar/Navbar'
import FooterComponent from './../footer/footer';

export default class LoginUser extends React.Component {
    constructor(props) {
        super(props);
        this.body={
            client_id:'eya3GQorzQDbuRMRdnxRXH3I7qHaWNoGfuC_yIgNmEk', 
            client_secret:'8teo3kaLTfWGbrfDm_DAE9vN_OhHGLAmxI5GYUsuFjE',
            redirect_uri:'urn:ietf:wg:oauth:2.0:oob',
            grant_type: 'authorization_code',
            code: ''
        }
        this.authorizeUrl = 'https://unsplash.com/oauth/authorize?client_id=eya3GQorzQDbuRMRdnxRXH3I7qHaWNoGfuC_yIgNmEk&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code&scope=public+read_user'
    }
    handleClick = async e => {

        setTimeout( async () => {

            await fetch('https://unsplash.com/oauth/token?client_id=eya3GQorzQDbuRMRdnxRXH3I7qHaWNoGfuC_yIgNmEk&redirect_uri=urn:ietf:wg:oauth:2.0:oob&client_secret=8teo3kaLTfWGbrfDm_DAE9vN_OhHGLAmxI5GYUsuFjE&grant_type=authorization_code&code=fASzeEsyRXB3GrRFeljZOXHxJJB1Y3o71x8FSH3kSu8',{ method: 'POST', header: {
                "Accept-Version": "v1"
            }})
            .then(r => r.json())
            .then(r => console.log(r))
            .catch(err => console.log(err))

        },1000*10)
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                    <div className="container" style={{height: 'auto', minHeight: '100vh'}}>
                    <div className="card  text-white bg-dark text-center" style={{marginTop: '100px', marginBottom: '20px'}}>
                        <div className="card-header">
                            Login
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Login Unsplash</h5>
                            <p className="card-text">Um die Website vollständig nutzen zu können musst du dich über Unsplash authorisieren.</p>
                            <a href={this.authorizeUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-light" 
                            onClick={ e => this.handleClick(e) }
                            >Login in with Unsplash</a>
                        </div>
                        </div>
                        <div className="card  text-white bg-dark text-center" style={{marginTop: '100px', marginBottom: '250px'}}>
                        <div className="card-header">
                            Authorisation Code
                        </div>
                        <div className="card-body" style={{marginTop: '10px', marginBottom: '250px'}}>
                            <h5 className="card-title">Authorisation Code</h5>
                            <p className="card-text">Kopiere den Code von Unsplash und füge diesen hier ein und bestätige dies mit dem Submit Button</p>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
                                </div>
                            </div>                      
                            </div>
                        </div>
                    </div>
                <FooterComponent />
            </React.Fragment>
        )
    }
}

