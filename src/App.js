import React from 'react';
import './App.css';
import NavBar from './components/Navbar/Navbar';
import PictureRend from './components/PictureRenderer/PictureRenderer';

export default class App extends React.Component {
  constructor(props) { 
    super(props); 
    this.content=[]; 
    this.state={ loading: true, elements: [] } 
  }




  render() {  
    return(
      <div className="app-container">
          <NavBar />
          <PictureRend />
      </div>
    )
  }
}
