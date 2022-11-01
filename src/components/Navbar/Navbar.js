import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_closed: true
        }
    }
    handleClick = () => {
        if(this.state.menu_closed){
            this.setState({menu_closed: false})
        }else{
            this.setState({menu_closed: true})
        }
    }
    render() {
        return(
            <>
            <header className="navbar-fixed">
                <nav className="navbar-header">
                    <a className="nav-menu-link" href={'#'}>
                        <div className="nav-container"
                            onClick={ this.handleClick }
                        >
                            <i className='fas fa-bars' style={{color: 'black', fontSize: '30px'}}></i>
                        </div>
                    </a>
                    <Link to={'/'} className="nav-menu-link nav-home-link">
                        <div className="nav-container">
                            Home
                        </div>
                    </Link>
                    <a className="nav-menu-link">
                        <div className="nav-container">
                            <div className="nav-container-search">
                                <form className="form-search">
                                    <input className="search-bar" placeholder="Search" type={'text'} />
                                    <button className="btn-search-enter"><i className='fas fa-search'></i></button>
                                </form>
                            </div>
                        </div>
                    </a>
                </nav> 
            </header>
            <div className={ this.state.menu_closed ?  "header-menu-container" : "header-menu-container open-container" }>
                <ul className={this.state.menu_closed ? "nav-menu-list display-none" : "nav-menu-list" }>
                    <li className={ this.state.menu_closed ? "nav-menu-item display-none" : "nav-menu-item"}>Nature</li>
                    <li className={ this.state.menu_closed ? "nav-menu-item display-none" : "nav-menu-item"}>Business</li>
                    <li className={ this.state.menu_closed ? "nav-menu-item display-none" : "nav-menu-item"}>Abstract</li>
                </ul>
            </div>
            </>

        )
    }
}