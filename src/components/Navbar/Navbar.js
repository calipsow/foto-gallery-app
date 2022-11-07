import React,{ useState, useEffect }  from 'react';
import './NavBar.css';
import { Link, useParams} from 'react-router-dom'
import 'jquery/dist/jquery.min.js'; // Have to install and import jQuery because of bootstrap modal's dependency
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LogoSvg = () => {
    return (
        <svg 
            width="34.000000pt" height="34.000000pt" viewBox="0 0 64.000000 64.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
            fill="#fff" stroke="none">
            <path d="M226 594 c-71 -22 -159 -112 -180 -184 -34 -115 -12 -206 73 -291 85
            -85 176 -107 291 -73 75 22 162 109 184 184 34 115 12 206 -73 291 -85 84
            -180 108 -295 73z m144 -131 c0 -14 -40 -73 -49 -73 -9 0 -51 61 -51 74 0 3
            23 6 50 6 28 0 50 -3 50 -7z m146 -111 c15 -80 -31 -168 -108 -206 -28 -14
            -68 -26 -88 -26 -58 0 -136 45 -165 94 -36 62 -42 122 -17 180 12 25 28 49 37
            52 31 12 77 -49 90 -118 10 -51 37 -75 73 -62 22 8 29 19 38 61 12 53 43 106
            72 122 14 8 21 3 39 -27 13 -20 26 -52 29 -70z"/>

            </g>
        </svg>
    )
}


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
        this.queryString = e.target.value.replace(/[^a-zA-Z0-9\sÄÖÜüäö]/g, '');
        this.setState({queryStr: this.queryString})      
    }

    render(){
        return (
            <>
            <nav style={{paddingLeft: '15px', paddingRight: '15px'}} className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to={"/"}>
               {1+1!==2 ? <i className="fas fa-home"  style={{color: 'white'}}></i> : <LogoSvg />}
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
                    <Link to={'/user/login'} className="dropdown-item">Login</Link>
                    <div className="dropdown-divider"></div>
                    <Link to={'/contact'} className="dropdown-item" href="#">Kontakt</Link>
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
    console.log( queryStr )
    useEffect(()=>{
        setQueryStr(prop.query.replace(/[\s]/g, '-'))
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
    if(!!query) query = query.replace(/[-]/g, ' ');

    return (
        <NavBarV2 user_id={ user_id || query || '' } />
    )
}