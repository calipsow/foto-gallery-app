import React from 'react';
import { Link } from 'react-router-dom'

const LogoSvg = () => {
    return (
        <svg 
            width="34.000000pt" height="34.000000pt" viewBox="0 0 64.000000 64.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
            fill="#fff" stroke="none">
            <path d="M226 594 c-71 -22 -159 -112 -180 -184 -34 -115 -12 -206 73 -291 85
            -85 176 -107 291 -73 75 22 162 109 184 184 34 115 12 206 -73 291 -85 84
            -180 108 -295 73z m144 -131 c0 -14 -40 -73 -49 -73 -9 0 -51 61 -51 74 0 3
            23 6 50 6 28 0 50 -3 50 -7z m146 -111 c15 -80 -31 -168 -108 -206 -28 -14
            -68 -26 -88 -26 -58 0 -136 45 -165 94 -36 62 -42 122 -17 180 12 25 28 49 37
            52 31 12 77 -49 90 -118 10 -51 37 -75 73 -62 22 8 29 19 38 61 12 53 43 106
            72 122 14 8 21 3 39 -27 13 -20 26 -52 29 -70z"/>

            </g>
        </svg>
    )
}

export default function FooterComponent () {
    return(       
        <div style={{position: 'relative', bottom: '0'}}> 
        <div className="card text-center text-white bg-dark mb-3" style={{borderRadius: '0'}}>
            <div className="card-header">
                <Link className="navbar-brand" to="/">
                    <LogoSvg />
                </Link>
            </div>
            <div className="card-body">
                <h5 className="card-title">Callipson</h5>
                <p className="card-text">Powered by Unsplash API. Creator Callipson</p>
                <Link to={"/contact"} className="btn btn-primary btn-light">Contact</Link>
            </div>
            <div className="card-footer text-muted">
                Impressum
            </div>
        </div>
        </div>
    )
}