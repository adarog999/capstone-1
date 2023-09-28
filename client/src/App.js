import React, { useState } from 'react';
import Login from './page/login-reg/Login'
import Register from './page/login-reg/Register';
import Nav from './components/Nav';
import './assets/css/style.css'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import LandingPage from './page/LandingPage';
import User from './page/User';
import Footer from './components/Footer';
import Artist from './page/Artist';
import UserContext from './components/contextProvider';
import decodeToken from "jwt-decode";
import Cookies from "js-cookie"
import Home from './page/Home';
import Main from './components/Home/Main';
import SdkPlayer from './components/SdkPlayer';
import WebPlayBack from './components/WebPlayBack';
function App() {
  const token = Cookies.get('token') || null;
  return (
    <div className="App">
        <Router>
      <UserContext.Provider value={token}>
      {/* <Nav /> */}
          <Routes>
          <Route path="/player" element={< SdkPlayer/>}/>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user" element={<User />} />
          <Route path="/webplayback" element={<WebPlayBack />} />
          <Route path="/home/:main_page" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/artist/:artist" element={<Artist />} />
         

          </Routes>
      </UserContext.Provider>

        </Router>
    </div>
  );
}

export default App;
