import React from 'react';



export default function DownloadButton(props){

    const triggerLink = (e) => {
        e.preventDefault();
        window.open(e.target.href);
    }


    const triggerDownloaded = (e) => {
        e.preventDefault();
        const key = generateKey();
        
        fetch(props.data.urls.small_s3, {
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
    )
}