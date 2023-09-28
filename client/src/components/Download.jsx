import React from 'react'
import "../assets/css/Download.css"
import AppleStore from '../assets/images/apple.png'
import GoogleStore from '../assets/images/google.png'
import DownloadImg from '../assets/images/download.png'
const Download = () => {
  return (
    <>

    <section className='download-container'>
        <div className="down-txt">
            <h1>Download Our Mobile App Now</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati provident earum recusandae enim alias corporis culpa dolores, repudiandae quod assumenda adipisci unde amet ad beatae quis, quasi sed nobis nam.</p>
            <div className='btns'>
                    <img src={AppleStore} alt="asd"  className='img1'/>
                    <img src={GoogleStore} alt="asd"/>
            </div>
          
        </div>
        <div className='down-image'>
            <img src={DownloadImg} alt="asd" />
            </div>
    </section>
    <div>
    <div className='newsletter'>
        <span className="newsletter-text">
                Want to receive email notification?
        </span>
        <div className='news-btn'>
          <input type="email" placeholder="Enter email add" className="input-email"/>
          <button className="signupBtn">Sign Up</button>
        </div>
        </div>
        
    </div>
    </>
  )
}

export default Download