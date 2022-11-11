import React from 'react';
import { useNavigate } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import FooterComponent from './../footer/footer';


export default function RedirectPage(){
    const navigate = useNavigate()
    let data = null
    React.useEffect(()=>{
        initialize()
    },[])

    const initialize = async () => {
        data = await fetchKeys()
        console.log(data)
        if( typeof data === 'boolean' ){
            navigate('/user/authorization/failed')

        } else {

            window.localStorage.setItem('access_token', data.access_token)
            window.localStorage.setItem('refresh_token', data.refresh_token)
            
            navigate('/user/current/profile/')    
        }
    } 

    const fetchKeys = async () => {
        return await fetch('http://localhost:3588/oauth/token/verify')
        .then((response) => response.json())
        .then((response) => response.response)
        .catch((error) => {console.error(error); return false})
    }

    return (
        <React.Fragment>
        <NavBar />
        <div className="container-fluid bg-light" style={{height: 'auto', minHeight: '100vh', paddingLeft: '0', paddingRight: '0'}}>
            
            
            <div className="container">
                <div className="card  text-white bg-dark text-center">
                    <div className="card-body  text-dark bg-light text-center">
                        <h5 className="card-title">Authentifikation läuft</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Sie werden gleich weitergeleitet...</h6>
                    </div>
                </div>
            </div>
            
            
        </div>
        <FooterComponent />
        </React.Fragment>
    )
}