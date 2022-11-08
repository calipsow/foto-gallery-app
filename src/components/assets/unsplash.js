import React from 'react';


const UnsplashSvg = () => {


    return( 
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="20.000000pt" height="20.000000pt" viewBox="0 0 24.000000 24.000000"
            preserveAspectRatio="xMidYMid meet">
        
            <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
            fill='#000' stroke="none">
            <path d="M4 227 c-2 -7 -3 -60 -2 -118 l3 -104 115 0 115 0 0 115 0 115 -113
            3 c-87 2 -114 0 -118 -11z m146 -42 c0 -21 -5 -25 -30 -25 -25 0 -30 4 -30 25
            0 21 5 25 30 25 25 0 30 -4 30 -25z m-60 -80 c0 -21 5 -25 30 -25 25 0 30 4
            30 25 0 21 5 25 30 25 29 0 30 -1 30 -50 l0 -50 -90 0 -90 0 0 50 c0 49 1 50
            30 50 25 0 30 -4 30 -25z"/>
            </g>
        </svg>
   )
}


export default function Unsplash (props) {


    return (
        <a  
            style={ {marginLeft: '0', position: 'absolute', right: '5px', top: '5px', fontSize: '15px'}}
            className="btn-icons link-elem-icon"
            href={props.url}
            target="_blank"
        >
            <UnsplashSvg  />
        </a>
    )
}
