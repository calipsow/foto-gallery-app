import React from 'react';
import './Loader.css'


// const loader =  () =>  <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

export default function Loader(){
    const cardStyle = {
        width: "100%", height: "250px", border: "1px solid white", borderRadius: "10px"
    }
    const containerStyle = {
        padding: '50px', marginLeft: '0', marginRight: '0', width: "100%", height: "auto", borderRadius: '10px'
    }
    return(
        <React.Fragment>
           
            <div className="container-fluid " style={{borderRadius:'10px'}}>

            <div id={'loader-container'} className="card text-white bg-dark" style={containerStyle}>
                
                <div style={cardStyle} className="card-body">
                    <h5 className="card-title"></h5>
                    <h6 className="card-subtitle mb-2 text-muted"><hr/></h6>
                    <p className="card-text"></p>
                    <a style={{color: 'white', textDecoration: 'none'}} href="#" className="card-link"><hr/></a>
                </div>
          
            </div>

            <div id={'loader-container'} className="card text-white bg-dark" style={containerStyle}>
                
                <div style={cardStyle} className="card-body">
                    <h5 className="card-title"></h5>
                    <h6 className="card-subtitle mb-2 text-muted"><hr/></h6>
                    <p className="card-text"></p>
                    <a style={{color: 'white', textDecoration: 'none'}} href="#" className="card-link"><hr/></a>
                </div>
          
            </div>
            

            </div>
        </React.Fragment>
    )
}