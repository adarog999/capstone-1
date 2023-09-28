import React from 'react'
import { useParams } from 'react-router-dom'
import '../assets/css/Artist.css'
const Artist = () => {
    const {artist} = useParams()
  return (
    <>
    <section className='proj-page'>
    {/* <button className='btn-art'>HELLO THERE</button>
    <div>{artist}</div> */}
    <div className="proj-container">
      
    <div className="left">
      <p className='banner'>readydeveloper<span>.me</span></p>
      <div className='left-btn'>

          <div className="btn-wrapper">
            <div className="button">
            <button></button>
            <div className="shadow"></div>
            </div>
          <span>Front</span>
          </div>

          <div className="btn-wrapper">
          <div className="button">
            <button></button>
            <div className="shadow"></div>
            </div>
          <span>Slide</span>
          </div>
          
          <div className="btn-wrapper">
          <div className="button">
            <button></button>
            <div className="shadow"></div>
            </div>
          <span>Closeup</span>
          </div>

          </div>

    </div>

      <div className="mid">
        <div className="hire-me">
          <h1>HIRE ME. ☺️</h1>
        </div>
        <div className="buttons">

        <div className='button'>
          <span>Poses</span>
          <button></button>
        </div>
        <div className='button'>
          <span>Colors</span>
          <button></button>
        </div>
        <div className='button'>
          <span>Hair</span>
          <button></button>
        </div>
        <div className='button'>
          <span>Beard</span>
          <button></button>
        </div>
        <div className='button'>
          <span>Faces</span>
          <button></button>
        </div>
        <div className='button'>
          <span>Hats</span>
          <button></button>
        </div>
        <div className='button'>
          <span>Logo</span>
          <button></button>
        </div>
        <div className='button'>
          <span>Lights</span>
          <button></button>
        </div>

        </div>
      </div>

      <div className="right">
          <div className='exp-btn'>
            <button>EXPORT</button>
            <div className="btn-shadow"></div>
          </div>
          <div className="side-bar-wrap">
                <div className="side-bar">
                  <div className='btn-top'>
                      <button></button>
                      <button></button>
                      <button></button>
                      <button></button>
                      <button></button>
                      <button></button>
                  </div>
                  <div className='btn-bottom'>
                      <button></button>
                      <div className="btn-shadow"></div>
                  </div>
                </div>
                <div className="side-shadow">
                  
                </div>
          </div>
      </div>
    </div>
    </section>
    </>
  )
}

export default Artist