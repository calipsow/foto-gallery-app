import React from 'react';
import './PictureRend.css'
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader';
export default class PictureRend extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            elements: [],
            loading: true,
            loadingPage: 0
        }
        this.loadingPage = 0;
        this.data = []; this.elements = [];
        // this.handleDownloadEvent = this.handleDownloadEvent.bind(this);
    }
    async componentDidMount(){
        window.scrollTo(0, 0)
        this.data = await this.fetchData();
        // console.log(this.data);
        this.data.forEach( dataSet => {
            this.elements.push(
                this.createElement(dataSet)
            )
        })

        this.setState({ elements: this.elements })
        
    }
    loadMoreButton = () => {

        return (
            <div style={{backgroundColor: 'transparent', width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>

                <button 
                className={"btn btn-dark"} 
                style={{marginBottom: '25px', marginTop: '25px'}}
                onClick={e => this.handleLoadMore()}
                >Load More</button>
            </div>
        )
    }

    handleLoadMore = async () => {
        this.data = await this.fetchData()
        console.log(this.data)
        this.data.forEach(dataSet => {            

            this.elements.push(this.createElement(dataSet))
        })
        this.loadingPage += 1
        this.setState({loadingPage: this.loadPages, elements: this.elements})
    }

    createElement = (dataSet) => {
        var uid = this.generateKey()
        const keys = Object.keys(dataSet.urls)

        var srcSet = "" 
        keys.forEach( key => {
            if(key === 'raw' || key === 'small_s3') return;
            srcSet += dataSet.urls[key] + key === 'thumb' ? dataSet.urls[key]+' 200w, ' : key === 'small' ? dataSet.urls[key]+' 400w, ' : key === 'regular' ? dataSet.urls[key]+' 1080w, ' : key === 'full' ? dataSet.urls[key]+' 2080w, ' : '' 
        })
        // console.log(srcSet)
        
        return (
            <div key={uid} className="container-item grid-item">


                <div className="picture-container" >                
                <p >
                <img 
                    width={'100%'}
                    height={'100%'}
                    sizes={'(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw'}
                    srcSet={srcSet}
                    className="img-generatet rounded mx-auto d-block"
                    id={uid}
                    src={ dataSet.urls.small.split('&').includes('w=400') ? dataSet.urls.regular : dataSet.urls.small }
                    alt={ dataSet.user.name }                
                ></img>
                {dataSet.user.samsungmemory}
                </p>
                <div className="container-user-info">
                    <Link to={'/user-profile/'+dataSet.user.username} style={{textDecoration: 'none', cursor: 'pointer'}}>
                        <img
                            id={uid}
                            src={dataSet.user.profile_image.medium}
                            width={'56px'}
                            height={'56px'}
                            style={{borderRadius: '100%', border:'none'}}
                        >                    
                        </img>
                        
                        
                    </Link>
                    <div>
                        <label htmlFor={uid} className="thumbnail-label">{dataSet.user.name}</label>
                    </div>
                       
                </div>
                <div className="button-container">
                    <button className="btn-icons">
                        {dataSet.likes+'    '}<i className="far fa-heart" ></i>
                    </button>
                    {
                    <a className="btn-icons link-elem-icon"     
                        onClick={ e => this.handleDownloadEvent(e) }
                        href={dataSet.urls.small_s3}
                        target="_blank"
                        download                                                              
                        style={{cursor:'pointer'}}
                    >
                        <i className="fas fa-cloud-download-alt" id={dataSet.urls.small_s3} style={{color: 'white'}}></i>

                     
                    </a> 
                    }

                </div>                    
                </div>


            </div>
        )
    }
 
    handleDownloadEvent = (e) => {
        e.preventDefault();
        const key = this.generateKey();
        console.log(e.target.id)
        console.log(e.target.id)

        fetch(e.target.id, {
            method: "GET",
            headers: {
                'cors':'no-cors'
            }
        })
        .then(response => {
            response.arrayBuffer().then(function(buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", key+'.jpeg'); //or any other extension
            document.body.appendChild(link);
            link.click();
            });
        })
        .catch(err => {
            console.log(err);
        });
        
    }


    generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }

    fetchData = async () => {
        return await fetch(`http://localhost:3588/api/pictures-random${this.loadingPage === 0 ? '' : '?pageCount='+this.loadingPage}`,{method: 'GET',headers: {'Content-Type': 'application/json','cors':'no-cors'}})
        .then(response =>  response.json() )
        .then(response =>  response.response )
        .catch(err => [err] )
    } 
/*
ttps://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80 1742w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80 1771w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80 2071w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80 2342w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80 2371w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80 2560w
*/

    render() {
        return (
            <React.Fragment>
                <div className="header-container-main">
                    <img 
                    // srcset={"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80 871w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80 1171w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80 1471w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80 1742w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80 1771w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80 2071w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80 2342w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80 2371w, https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80 2560w"} sizes={"(max-width: 767px) 100vw, (max-width: 903px) min(100%, 871px), (max-height: 756px) min(100%, 871px), (min-aspect-ratio: 2560/1705) calc((calc(100vh - 175px)) * 1.50147), calc(100vw - 32px)"} 
                    alt="image" width={"100%"} height={"auto"} 
                    src={' https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80'}
                    ></img>
                
                    <h1 className="title-main" >Unsplash Clone</h1>
                </div>

                <div className="picture-container-main">
                    
                        { this.state.elements.length === 0 ? <Loader/> : this.state.elements.map( elem => elem )  }

                        
                </div>
                    { this.loadMoreButton() }
               
            </React.Fragment>
        )
    }
}

