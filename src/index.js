import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfilePage';
import SearchSite from './components/SearchSite/SearchSite';
import ContactComponent from './components/contact/contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={'/'} element={<App />} />
        <Route path={'user-profile/:user_id'} element={<UserProfile />} />
        <Route path={'search/query/:query'}  element={<SearchSite />} />
        <Route path={'contact'} element={<ContactComponent />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
