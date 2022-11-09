import React from 'react';


export default class UpdateInformation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
        this.values = {}
        this.handleChangeEvent = this.handleChangeEvent.bind(this)
    }
    handleUpdateEvent = async (e) => {
        e.preventDefault();
        switch (e.target.id){
            case 'button-addon2-username': if(!!this.values.username){await this.fetchUpdateData(this.values.username, 'username') } break;
            case 'button-addon2-first_name': if(!!this.values.first_name ){ await this.fetchUpdateData(this.values.first_name, 'firstName')} ; break;
            case 'button-addon2-last_name': if(!!this.values.last_name ){ await this.fetchUpdateData(this.values.last_name, 'lastName')} break;
            case 'button-addon2-email': if(!!this.values.email ){await this.fetchUpdateData(this.values.email, 'email') } break;
            case 'button-addon2-url': if(!!this.values.url){ await this.fetchUpdateData(this.values.url, 'url')} break;
            case 'button-addon2-location': if(!!this.values.location ){ await this.fetchUpdateData(this.values.location, 'location') } break;
            case 'button-addon2-bio': if(!!this.values.bio) {await this.fetchUpdateData(this.values.bio, 'bio')} break;
            case 'button-addon2-instagram_username': if(!!this.values.instagram_username ){ await this.fetchUpdateData(this.values.instagram_username, 'instagram_username')} break;
        }
      
    }

    fetchUpdateData = async (data, query) => {
        let result = await fetch('http://localhost:3588/api/user/authenticated/profile/update?token='+window.localStorage.getItem('access_token')+'&'+query+'='+data)
        .then(response => response.json())
        .then(response => response.response )
        .catch(err => console.log(err) )

        if(typeof result !== 'boolean'){
            console.log(result)
        }
    }

    handleChangeEvent = async (e) => {
        
        switch(e.target.ariaLabel){ 
            case 'username': this.values.username = e.target.value; break;
            case 'First-Name': this.values.first_name = e.target.value; break;
            case 'Last-Name': this.values.last_name = e.target.value; break;
            case 'Email': this.values.email = e.target.value; break;
            case 'Website': this.values.url = e.target.value; break;
            case 'Location': this.values.location = e.target.value; break;
            case 'Bio': this.values.bio = e.target.value; break;
            case 'Instagram_username': this.values.instagram_username = e.target.value; break;
            default: break;
        }
        
    }

    render() {
        return (
            <div className="conatainer-fluid">
            <div className="container d-flex justify-content-center">
                <div class="d-flex flex-column bd-highlight mb-3 justify-content-center">
                    <div class="d-flex p-2 bd-highlight flex-row justify-content-between">
                      
                        <div class="d-flex flex-column ">
                        <div class="d-flex p-2 bd-highlight">
                                <span class="font-weight-bold">{this.props.data.username}</span>
                            </div>  
                            <div class="input-group mb-3">                            
                                <input type="text" class="form-control" placeholder="Username" aria-label="username" aria-describedby="button-addon2-username" 
                                onChange={e=>this.handleChangeEvent(e)}/>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2-username" 
                                    onClick={e => this.handleUpdateEvent(e) }
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex p-2 bd-highlight flex-row justify-content-between">
                      
                        <div class="d-flex flex-column ">
                        <div class="d-flex p-2 bd-highlight"><span class="font-weight-bold">{this.props.data.first_name}</span>  </div>  
                            <div class="input-group mb-3">                            
                                <input type="text" class="form-control" placeholder="First Name" aria-label="First-Name" aria-describedby="button-addon2-first_name"
                                onChange={e=>this.handleChangeEvent(e)}
                                />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2-first_name"
                                    onClick={e => this.handleUpdateEvent(e) }
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex p-2 bd-highlight flex-row justify-content-between">
                      
                        <div class="d-flex flex-column ">
                        <div class="d-flex p-2 bd-highlight"><span class="font-weight-bold">{this.props.data.last_name}</span>  </div>  
                            <div class="input-group mb-3">                            
                                <input type="text" class="form-control" placeholder="Last Name" aria-label="Last-Name" aria-describedby="button-addon2-last_name" 
                                onChange={e=>this.handleChangeEvent(e)}
                                />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2-last_name"
                                    onClick={e => this.handleUpdateEvent(e) }
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex p-2 bd-highlight flex-row justify-content-between">
                      
                        <div class="d-flex flex-column ">
                        <div class="d-flex p-2 bd-highlight"><span class="font-weight-bold">{this.props.data.email}</span>  </div>  
                            <div class="input-group mb-3">                            
                                <input type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="button-addon2-email" 
                                onChange={e=>this.handleChangeEvent(e)}
                                />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2-email"
                                    onClick={e => this.handleUpdateEvent(e) }
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex p-2 bd-highlight flex-row justify-content-between">
                      
                        <div class="d-flex flex-column ">
                        <div class="d-flex p-2 bd-highlight"><span class="font-weight-bold">{this.props.data.portfolio_url === null ? 'Website' : this.props.data.portfolio_url }</span>  </div>  
                            <div class="input-group mb-3">                            
                                <input type="text" class="form-control" placeholder="Website" aria-label="Website" aria-describedby="button-addon2-url" 
                                onChange={e=>this.handleChangeEvent(e)}
                                />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2-url"
                                    onClick={e => this.handleUpdateEvent(e) }
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex p-2 bd-highlight flex-row justify-content-between">
                      
                        <div class="d-flex flex-column ">
                        <div class="d-flex p-2 bd-highlight"><span class="font-weight-bold">{this.props.data.location === null ? 'Location' : this.props.data.location}</span>  </div>  
                            <div class="input-group mb-3">                            
                                <input type="text" class="form-control" placeholder="Location" aria-label="Location" aria-describedby="button-addon2-location" 
                                onChange={e=>this.handleChangeEvent(e)}
                                />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2-location"
                                    onClick={e => this.handleUpdateEvent(e) }
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex p-2 bd-highlight flex-row justify-content-between">
                      
                        <div class="d-flex flex-column " style={{width: '100%'}}>
                        <div class="d-flex p-2 bd-highlight"><span class="font-weight-bold">{ this.props.data.bio=== null ? 'Bio' : this.props.data.bio}</span>  </div>  
                            <div class="input-group mb-3" >  
                                <textarea class="form-control" aria-label="Bio" placeholder="Bio" aria-describedby="button-addon2-bio" 
                                onChange={e=>this.handleChangeEvent(e)}
                                ></textarea>                          

                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2-bio"
                                    onClick={e => this.handleUpdateEvent(e) }
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex p-2 bd-highlight flex-row justify-content-between">
                      
                        <div class="d-flex flex-column ">
                        <div class="d-flex p-2 bd-highlight"><span class="font-weight-bold">{this.props.data.instagram_username===null ? 'Instagram' : this.props.data.instagram_username}</span>  </div>  
                            <div class="input-group mb-3">                            
                                <input type="text" class="form-control" placeholder="Instagram username" aria-label="Instagram_username" aria-describedby="button-addon2-instagram_username" 
                                onChange={e=>this.handleChangeEvent(e)}
                                />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2-instagram_username"
                                    onClick={ e => this.handleUpdateEvent(e) }
                                    >Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        )
    }
}