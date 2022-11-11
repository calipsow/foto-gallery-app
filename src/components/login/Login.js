import React from 'react';
import { Link, useParams } from 'react-router-dom'
import NavBar from './../Navbar/Navbar'
import FooterComponent from './../footer/footer';

class LoginUserClass extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="container-fluid bg-light" style={{height: 'auto', minHeight: '100vh', paddingLeft: '0', paddingRight: '0'}}>
                <NavBar />
                    { this.props.failedAuth === 'failed' ? 
                    <div className="alert alert-warning" role="alert">
                        Authentifikation ist fehlgeschlagen versuchen Sie es später erneut.
                    </div> : null }
                    <div className="container" style={{marginBottom: '150px'}}>
                    <div className="card  text-white bg-dark text-center" style={{marginTop: '100px', marginBottom: '20px', minHeight: '500px'}}>
                        <div className="card-header">
                            Login
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Login Unsplash</h5>
                            <p className="card-text">Um die Website vollständig nutzen zu können musst du dich über Unsplash authorisieren.</p>
                            <div class="card">
                                <div class="card-body text-dark">
                                    <p className="font-weight-light">
                                        Solltest du noch keinen Account bei Unsplash haben so kannst du dir den einfach über den unteren Button erstellen.
                                    </p>
                                    <hr/>
                                    <p className="font-weight-light">
                                        Du benötigst dann einen Unsplash Account, 
                                        wenn du dir eine Collection erstellen möchtest, sowie für das Interagieren mit Content, beispielsweise mit Likes.   
                                    </p>
                                    <p className="font-weight-light">
                                        In dem Moment in dem du authorisiert bist, kannst du auch deine persönlichen Daten bei Unsplash, über dise Website bequem aktualisieren.

                                    </p>
                                    <hr/>
                                    <p className="font-weight-light">
                                        Downloads, Bildersuche und die Statistik Recherche sind selbstverständlich 
                                        auch ohne eine Authentifikation möglich.                                        
                                    </p>
                                    <p className="font-weight-light">
                                        Über den unteren Button gelangst du zu Unsplash um dich anzumelden oder zu registrieren.
                                    </p>

                                </div>
                            </div>
                            <br/>
                            <a href={this.authorizeUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-light" 
                            
                            >Weiter zu Unsplash</a>
                            <br/>
                            <Link style={{marginTop: '20px'}} to={'/'} className="btn btn-primary btn-light" >Weiter ohne Anmeldung</Link>
                        </div>
                        </div>

                    </div>
                <FooterComponent />
            </div>
        )
    }
}

export default function LoginUser(){
    const { success } = useParams()

    return (
        <LoginUserClass failedAuth={ success || null } />
    )
}