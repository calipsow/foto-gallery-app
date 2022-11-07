import React,{ useEffect, useState, useParams } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from './../Navbar/Navbar'
import FooterComponent from './../footer/footer';

export default class LoginUser extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <React.Fragment>
                <NavBar />
                    <LoginInterface />
                <FooterComponent />
            </React.Fragment>
        )
    }
}

const LoginInterface = () => {
    useEffect(()=>{
        const red = async () => {
            await fetch('https://unsplash.com/oauth/authorize?client_id=eya3GQorzQDbuRMRdnxRXH3I7qHaWNoGfuC_yIgNmEk&redirect_uri=http://127.0.0.1:3000/user/login&response_type=code&scope=public+read_user',{
                method: 'GET', 'cors':'no-cors', 'accept':'*'
            })         
            .then(r =>  console.log(r))
            .catch(er => console.log(er) )
        } 
        red()
    })

    return (
        <></>
    )
}