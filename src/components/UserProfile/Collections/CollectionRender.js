import React from 'react';
import './CollectionRend.css'
import axios from 'axios';
import Loader from '../../loader/Loader'
export default class CollectionRend extends React.Component {
    constructor(props){
        super(props);
        this.firstReq = true;
        this.data = null
        this.state = {
            loading: true, 
            collectionAvailable: false
        }
        this.elements = [];
        this.previewPhotoLinks = []
    }

    fetchCollection = async () => {
        // console.log(this.props.username)
        return await axios.get(`http://localhost:3588/api/user-lookup/collections?userName=deepufashion`,{'cors':'no-cors'})
        .then(response => {console.log(response.data); return response.data})
        .catch(err => {console.log(err); return []})
    }

    async componentDidMount(){
        if(!this.firstReq) return;
        this.firstReq = false;
        this.data = await this.fetchCollection()
        // console.log(this.data.response, this.data.response.length)

        if(this.data.response.length === 0 ){
            this.setState({collectionAvailable: true, loading: false})
        
        } else {
            this.handleDataSet()
        }
    }

    handleDataSet = () => {
        this.images = []
        this.data.response.forEach(response => {

            response.preview_photos.forEach( previewPhotos => {
                this.images.push(
                    
                    this.createElementPreview(
                        previewPhotos.urls.thumb
                        , response.description || 'photo collection'
                    )
                
                )
            })
            this.elements.push(this.createElementDivCont(this.images))
            this.images = [];
        })
        // console.log(this.elements)
        this.setState({loading: false, collectionAvailable: true})
        
    }

    createElementPreview = (imageSrc, alt) => {
        return(
            <img
                className='rounded'
                key={this.generateKey()} 
                src={imageSrc}
                alt={alt}
                width={'50%'}
                height={'50%'}
            ></img>
        )
    }

    createElementDivCont = (elems=[]) => {
        let lastTwo = elems.slice(-2)
        let firstTwo = elems.slice(0, 2)
        return (
            <div 
            key={this.generateKey()}
            className="image-container collection-image-con container">
                <div className="image-container-inner-top">{ lastTwo }</div>
                <div className="image-container-inner-bottom">{ firstTwo }</div>
            </div>
        )
    }

    generateKey = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + new Date().getTime();
    }

    render(){
        return (
            <React.Fragment>
                {
                    <div className="picture-container-main collection-con">{
                        this.state.loading && !this.state.collectionAvailable ? <Loader /> 
                    
                        : !this.state.collectionAvailable && !this.state.loading ? <div>No collection available</div>
    
                        : this.elements    
                    }</div>
                }
            </React.Fragment>
        )
    }
}