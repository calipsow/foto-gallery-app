import React from 'react';
import './App.css';
import NavBar from './components/Navbar/Navbar';
import PictureRend from './components/PictureRenderer/PictureRenderer';
import FooterComponent from './components/footer/footer';
export default class App extends React.Component {
  constructor(props) { 
    super(props); 
    this.content=[]; 
    this.state={ loading: true, elements: [] } 
  }
  render() {  
    return(
      <>
        <NavBar />
        <div className="app-container">
            <PictureRend />
            <FooterComponent />
        </div>
      </>
    )
  }
}
