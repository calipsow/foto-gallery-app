import React from 'react';
import './Loader.css'



export default function Loader(){
    return(
        <React.Fragment>
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </React.Fragment>
    )
}