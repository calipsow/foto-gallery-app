import React from 'react';
import './Loader.css'


// const loader =  () =>  <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

export default function Loader(){
    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
      
    
    
    
    const cardStyle = {
        width: "100%", height: "250px", border: "none", borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px"
    }
    const containerStyle = {
        padding: '50px', marginLeft: '0', marginRight: '0', width: "100%", height: "auto", borderRadius: '10px'
    }
    const cardBodyStyle = {
        backgroundColor: 'rgba(75,75,75,.5)', height: "50px", borderRadius: '10px'
    }
    const bodyCard = {
        width:  randomIntFromInterval(0, 2) === 0 ? '100%' : randomIntFromInterval(0, 2) === 1 ? '70%' : randomIntFromInterval(0, 2) === 2 ? '80%' : '90%',
        backgroundColor: cardBodyStyle.backgroundColor, height: cardBodyStyle.height, borderRadius: cardBodyStyle.borderRadius  
    }
    return(
        <React.Fragment>
           
            <div className="container-fluid " style={{borderRadius:'10px'}}>

            <div id={'loader-container'} className="card text-white bg-dark" style={containerStyle}>
           
            <div className="container" style={cardBodyStyle}></div> 
                <hr/>
                <div style={cardStyle} className="card-body">
                    <h5 className="card-title"></h5>
                    <div className="container" style={bodyCard}></div>
                    <h6 className="card-subtitle mb-2 text-muted"><hr/></h6>
                    <p className="card-text"></p>
                    <div className="container" style={bodyCard}></div>
                    <p style={{color: 'white', textDecoration: 'none'}} className="card-link"><hr/></p>
                    <div className="container" style={bodyCard}></div> 
                </div>
          
            </div>
           
            <div id={'loader-container'} className="card text-white bg-dark" style={containerStyle}>
            <div className="container" style={cardBodyStyle}></div>     
            <hr/>
                <div style={cardStyle} className="card-body">
                    <h5 className="card-title"></h5>
                    <div className="container" style={bodyCard}></div>
                    <h6 className="card-subtitle mb-2 text-muted"><hr/></h6>
                    <p className="card-text"></p>
                    <div className="container" style={bodyCard}></div>
                    <p style={{color: 'white', textDecoration: 'none'}} className="card-link"><hr/></p>
                    <div className="container" style={bodyCard}></div> 
                </div>

            </div>
            

            </div>
        </React.Fragment>
    )
}