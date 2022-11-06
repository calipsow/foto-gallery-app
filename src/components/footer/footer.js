import React from 'react';
import { Link } from 'react-router-dom'


export default function FooterComponent () {
    return(
        <div className="card text-center text-white bg-dark mb-3" style={{borderRadius: '0'}}>
            <div className="card-header">
                Unsplash Clone
            </div>
            <div className="card-body">
                <h5 className="card-title">Callipson</h5>
                <p className="card-text">Powered by Unsplash API. Creator Callipson</p>
                <Link to={"/"} className="btn btn-primary">Home</Link>
            </div>
            <div className="card-footer text-muted">
                Impressum
            </div>
        </div>
    )
}