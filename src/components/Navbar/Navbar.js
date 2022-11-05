import React,{ useState, useEffect }  from 'react';
import './NavBar.css';
import { Link, useParams} from 'react-router-dom'
import 'jquery/dist/jquery.min.js'; // Have to install and import jQuery because of bootstrap modal's dependency
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default class NavBar extends React.Component {
    render() {
        
        return (<Navbar_V2 />)
        
    }
}


class NavBarV2 extends React.Component{
    constructor(props){
        super(props);
        this.state={ showNav: false, queryStr: '' }
        this.queryString = ''
        this.toggleNav = this.toggleNav.bind(this);
        this.handleSearchEvent = this.handleSearchEvent.bind(this);

    }
    toggleNav() {
        this.setState({ 
            showNav: !this.state.showNav
        })
    }
    handleSearchEvent = (e) => {
        e.preventDefault();
        this.queryString = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        this.setState({queryStr: this.queryString})      
    }

    render(){
        return (
            <>
            <nav style={{paddingLeft: '15px', paddingRight: '15px'}} className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to={"/"}>
                <i className="fas fa-home"  style={{color: 'white'}}></i>
            </Link>
            <button  onClick={this.toggleNav} className="navbar-toggler" type="button" data-togle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={(this.state.showNav ? 'show' : '') + ' collapse navbar-collapse'} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to={"/"}  style={{color: 'white'}}>Home <span className="sr-only">(current)</span></Link>
                </li>

                <li className="nav-item dropdown">
                    <a  style={{color: 'white'}} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Menu
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to={'/'}>Startseite</Link>
                    <a className="dropdown-item" href="#">Impressum</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Kontakt</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a  style={{color: 'rgba(170,170,170,.5)'}} className="nav-link disabled" href="#">{ !this.props.user_id ? '' : this.props.user_id}</a>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0" >
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" 
                        onChange={e => this.handleSearchEvent(e) }
                    />
                    <Navigation query={this.state.queryStr} />
                </form>
            </div>
            </nav>
            </>
        )
    }
}

const Navigation = (prop) => {

    const [ queryStr, setQueryStr ] = useState(prop.query)
    
    useEffect(()=>{
        setQueryStr(prop.query)
    },[prop])


    return(
        <React.Fragment>
        {
            queryStr !== '' 
            ? <Link to={'/search/query/'+queryStr}    >
                <button type="button" className="btn btn-outline-success my-2 my-sm-0" >Search</button>
            </Link>

            : <Link to={'/'}  >
                <button type="button" className="btn btn-outline-success my-2 my-sm-0" >Search</button>
            </Link>
        }
        </React.Fragment>
    )
}

const Navbar_V2 = () => {
    let { user_id, query } = useParams()

    return (
        <NavBarV2 user_id={ user_id || query || '' } />
    )
}