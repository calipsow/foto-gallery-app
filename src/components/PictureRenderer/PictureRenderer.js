import React from 'react';
import './PictureRend.css'
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader';
import Likes from '../assets/likes';
import { useNavigate } from 'react-router-dom';
export default class PictureRend extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            elements: [],
            loading: true,
            loadingPage: 0, liked: false
        }
        this.loadingPage = 0;
        this.data = []; this.elements = [];
        // this.handleDownloadEvent = this.handleDownloadEvent.bind(this);
    }
    async componentDidMount(){
        window.scrollTo(0, 0)
        this.data = await this.fetchData();
        this.data.forEach( dataSet => {
            this.elements.push(
                this.createElement(dataSet)
            )
        })

        this.setState({ elements: this.elements, loading: false })
        
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
        
        return (
            <React.Fragment key={uid}>
            <div  className="container-item grid-item">


                <div className="picture-container" >                
                <p >

                <Link to={'/photo/statics/'+dataSet.id} >
                    <img 
                        width={'100%'}
                        height={'100%'}
                        sizes={'(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw'}
                        srcSet={srcSet}
                        className="img-generatet rounded mx-auto d-block"
                        id={uid}
                        src={ dataSet.urls.small.split('&').includes('w=400') ? dataSet.urls.regular : dataSet.urls.small }
                        alt={ dataSet.user.name }    
                        onError={ e => {
                            e.target.onError = null
                            e.target.src = '/david-pupaza-heNwUmEtZzo-unsplash.jpg'
                            e.target.alt = 'Failed to load Image'
                        }}
                        ></img>
                </Link>

                {dataSet.user.samsungmemory}
                </p>
                <div className="container-user-info">
                    <Link to={'/user-profile/'+dataSet.user.username} style={{textDecoration: 'none', cursor: 'pointer'}}>
                        <img                      
                            alt={dataSet.user.name}      
                            id={uid}
                            src={dataSet.user.profile_image.medium}
                            width={'56px'}
                            height={'56px'}
                            style={{cursor: 'pointer', borderRadius: '100%', border:'none'}}
                            onError={ e => {
                                e.target.onError = null
                                e.target.src = '/david-pupaza-heNwUmEtZzo-unsplash.jpg'
                                e.target.alt = 'Failed to load Image'
                            }}
                        >                    
                        </img>
                        
                        
                    </Link>
                    <div>
                        <label htmlFor={uid} className="thumbnail-label">{dataSet.user.name}</label>
                    </div>
                       
                </div>
                <div className="button-container">
                    <LikeButton dataSet={dataSet} photo_id={dataSet.id} liked_by_user={dataSet.liked_by_user}/>
                    {
                    <a className="btn-icons link-elem-icon"     
                        onClick={ e => this.handleDownloadEvent(e) }
                        href={dataSet.urls.small_s3}
                        target="_blank"
                        download                                                              
                        style={{cursor:'pointer'}}
                        rel={'noreferrer'}
                    >
                        <i className="fas fa-cloud-download-alt" id={dataSet.urls.small_s3} style={{color: 'white'}}></i>

                     
                    </a> 
                    }
                   
                </div>
                <a 
                    className="btn-icons link-elem-icon" rel={'noreferrer'} href={dataSet.links.html} 
                    target="_blank" style={{color: 'black', marginLeft: '0', position: 'absolute', top: '1px', right: '10px'}}>                 
                    {<i className="fa fa-link" style={{color: 'white'}}></i>}
                </a>              
                </div>
                

            </div>
            
            </React.Fragment>
        )
    }
 



    handleDownloadEvent = (e) => {
        e.preventDefault();
        const key = this.generateKey();


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
        let sty = {backgroundColor:'rgba(170,170,170,0)', backdropFilter:'blur(2px)'}
        return (
            <React.Fragment>
                <div className="card bg-dark text-white"style={{borderRadius:'0', minHeight: '100px'}}>
                    <img className="card-img" src={'/sebastian-svenson-d2w-_1LJioQ-unsplash (1).jpg'} alt="Card logo callipson" />
                    <div className="card-img-overlay" style={{borderRadius:'0'}}>
                        <div class="jumbotron" style={sty}>
                                <h1 className="display-4 text-light font-weight-normal">Callipson</h1>
                                <hr className="my-4"/>
                                <blockquote className="blockquote">
                                    <p className="mb-0 lead text-white font-weight-light lead" style={{fontSize:'1rem'}}>This Application is powered by Unsplash</p>                                                                

                                </blockquote>
                        </div>

                    </div>
                </div>

                <br/>
               
                <div className="picture-container-main">
                    
                        { this.state.elements.length === 0 ? <Loader/> : this.state.elements.map( elem => elem )  }

                        
                </div>
                    
                { 
                !this.state.loading ?
                <div className="container text-white" style={{marginBottom: '30px', marginTop: '30px', backgroundColor: 'transparent'}}>
                    <div className="container bg-dark" style={{padding: '30px', borderRadius: '10px'}}>
                        <h5 className="text-center text-justify card-title mb-2 text-white font-weight-bold">
                            Wissenswertes 
                        </h5>
                        <h6 className="text-center text-justify card-subtitle mb-2 text-muted text-white-50">
                           über diese Anwendung
                        </h6>
                        <br/>
                    <div className="card  bg-light text-black">
                        
                        <div className="card-body text-dark">
                            <p className="card-text  font-weight-normal text-center">
                                Die Bilder und Nutzerdaten die hier zu finden sind werden von 
                                <a style={{textDecoration: 'none'}} rel="noreferrer" className="card-link font-weight-light " href="https://unsplash.com/" target="_blank" > Unsplash </a>
                                bereitgestellt.
                                Unsplash ist eine der größten Platformen für Stock Bilder, die der freien Nutzung zur Verfügung stehen.
                                <hr/>
                                Hinzu ist Unsplash ein Ort an dem User ihre Bilder der Welt präsentieren und bereitstellen können.
                                Dadurch wird die Vermittlung von professionellen Künstlern und Fotografen an potenzielle 
                                Auftraggeber ermöglicht.
                                <hr/>
                                Auch ein Einkommen über Spenden, der Nutzer die Gefallen an den Bildern haben, ist keine Seltenheit.

                                Werde auch du ein Teil der <a style={{textDecoration: 'none'}} rel="noreferrer" className="card-link font-weight-light" href="https://unsplash.com/" target="_blank" >Unsplash Community</a>, wenn du es noch nicht bist.
                            </p>
                        </div>
                        <br/>
                    </div>
                    <br/>
                    <div className="container">
                            <a class="btn btn-primary btn-lg btn-block bg-light text-black border border-dark" 
                            style={{textDecoration: 'none'}}  
                            href="https://unsplash.com/" rel="noreferrer"
                            target="_blank" >Unsplash Community</a>

                        </div>
                        
                    </div>
                </div>
                : <Loader></Loader> }
                { this.loadMoreButton() }
            </React.Fragment>
        )
    }
}

const LikeButton = (props) => {
    const navigate = useNavigate()
    const [ liked, setLike ] = React.useState(props.liked_by_user)
 
    const handleLikeEvent = async (e) => {        
        e.preventDefault();
 
        setLike(!liked)

        if(!window.localStorage.getItem('access_token')){
            navigate('/user/authorization')

        } else {
            await Likes({photo_id: props.photo_id, token: window.localStorage.getItem('access_token'), liked: liked})    
        }
    } 

    return(
        <button className="btn-icons" onClick={ e => handleLikeEvent(e) } >
            {props.dataSet.likes+'    '}{ !liked ? <i className="far fa-heart" ></i> : <i className="fas fa-heart" ></i> }
        </button>
    )

}