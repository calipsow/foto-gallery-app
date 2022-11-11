import React from 'react';
import Like from './likes';
import { useNavigate } from 'react-router-dom'

export default function DownloadButton(props){
    const navigate = useNavigate()
    const [ liked, setLike ] = React.useState(props.data.liked_by_user)
    
   


    const handleLikeEvent = async (e) => {        
        e.preventDefault();

        if(!window.localStorage.getItem('access_token')){
            navigate('/user/authorization')

        } else {
            setLike(!liked)
            await Like({photo_id: props.data.id, token: window.localStorage.getItem('access_token'), liked: liked})
        }
    } 

    
    const triggerLink = (e) => {
        e.preventDefault();
        window.open(e.target.href);
    }

    const triggerDownloaded = async (e) => {
        e.preventDefault();
        const key = generateKey();
        
        let url = await fetch(props.data.links.download_location+'&client_id=eya3GQorzQDbuRMRdnxRXH3I7qHaWNoGfuC_yIgNmEk')
        .then( response => response.json())
        .then(response => response.url)
        .catch(err => {console.log(err.message); return null})

        fetch(url, {
            method: "GET",
            headers: {
                'cors':'no-cors'
            }
        })
        .then( response => {
            response.arrayBuffer().then(function(buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            let fileName = key+'-'+props.data.user.username+'-powered-by-unsplash'
            link.setAttribute("download", fileName+'.jpeg'); //or any other extension
            document.body.appendChild(link);
            link.click();
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    const generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }

    return (
        <>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary active" onClick={ e => triggerDownloaded(e) } >
                <input type="radio" name="options" id="option1" autoComplete="off" readOnly={true}                   
                /> Download
            </label>
            <label className="btn btn-secondary" onClick={ e => triggerLink(e) } >
                <a style={{color: '#fff', textDecoration: 'none'}} name="options" id="option2" href={props.data.links.html} target="_blank" 
                rel='noreferrer'
                > View on Unsplash </a>
            </label>
        </div>
        <div className="btn-group" role="group" aria-label="Basic example" style={{marginLeft: '0', borderRadius: '0'}} onClick={ e => handleLikeEvent(e) }>
            <button type="button" className="btn btn-secondary" >
                    { 
                    liked 
                    ? <i className='fas fa-heart' style={{fontSize:'20px', color:'red'}}></i> 
                    : <i className='far fa-heart' style={{fontSize:'20px'}}></i>}
            </button>
        </div>
        </>
    )
}