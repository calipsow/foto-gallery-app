import React from 'react';
import NavBar from './../Navbar/Navbar';
import FooterComponent from './../footer/footer';


export default class ContactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null
        }
        this.values = { emailAdress: '', name: '', message: '' }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = e => {
        e.preventDefault();
        switch (e.target.id) {
            case 'exampleFormControlInput1': this.values.emailAdress = e.target.value; break;
            case 'inputPhone': this.values.name = e.target.value; break;
            case 'exampleFormControlTextarea1': this.values.message = e.target.value; break;

            default: break;
        }
    }
    async requestForm( data ){

        return await fetch("https://public.herotofu.com/v1/a1aa9440-5e32-11ed-b82c-5d75eaa7ccff",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify( data )
        }).then( response => {           

            return true;
            // set loading status 
        }).catch( error => {

            return false;
            // set loading status
        })

    }


    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.validateEmail(this.values.emailAdress))
        
        if(this.validateEmail(this.values.emailAdress) && this.values.message.trim().length > 10 && this.values.name.trim().length > 2 ){
            let data = { 
                "email": this.values.emailAdress, "name": this.values.name, "message": this.values.message
            }
            const arr = ['exampleFormControlInput1', "inputPhone", "exampleFormControlTextarea1"]
            arr.forEach(id => {
                document.querySelectorAll('#'+id)[0].value = '';
            })
            this.setState({success: await this.requestForm( data )})
            console.log("valid")
        }else{

            console.log("not valid")
        }
        
    } 

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    successAlert = () => {
        return(
            <div class="alert alert-primary" role="alert">
                    Message successfully send!
            </div>
        )
    }

    failureAlert = () => {
        return(
            <div class="alert alert-warning" role="alert">
                Something went wrong..
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="card bg-dark text-white" style={{borderRadius:'0', marginBottom: '150px'}}>
                <img className="card-img" src="/volodymyr-hryshchenko-V5vqWC9gyEU-unsplash.jpg" alt="conatct" style={{borderRadius:'0'}}/>
                <div className="card-img-overlay" style={{textAlign:'center', verticalAlign:'middle'}}>
                    <h2 className="card-title" >Contact Us</h2>
                </div>
                </div>

                <div className="container" style={{marginBottom: '150px'}}>
                { this.state.success ? this.successAlert() : this.state.success === null ? <></> : this.failureAlert() }
                <form target='_self' >
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Email</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={e => this.handleChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Name</label>
                        <input type="text" class="form-control" id="inputPhone" placeholder="Name" onChange={e => this.handleChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Message</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" onChange={e => this.handleChange(e)}></textarea>
                    </div>
                    <br/>
                    <button className="btn btn-primary btn-lg btn-block" type="reset" onClick={ e => this.handleSubmit(e) } >Send Message</button>
                </form>
                
                </div>
                <FooterComponent />  
            </React.Fragment>
        )
    }
}