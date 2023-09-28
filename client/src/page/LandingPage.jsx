import Video from '../assets/videos/bgimg2.mp4'
import '../assets/css/landing.css'
import Headset from '../assets/images/headset.png'
import Footer from '../components/Footer'
import { useEffect,useState,useRef } from 'react'
import Favorite from '../components/Favorite'
import SneackPeak from '../components/SneackPeak'
import Download from '../components/Download'
import { Link } from 'react-router-dom'
import WhatsNext from '../components/WhatsNext'
import Nav from '../components/Nav'


const LandingPage = () => {
  const [colors,setColors] = useState([
    "#75E97C","#E1AA16","#E8423B","#002050","#7237E4","#89660A"
  ])
  const [cursor,setCursor] = useState({
    x: 0,
    y: 0
  })
  const EffectRef = useRef(null)
  useEffect(() => {

    let animationFrameId;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // Use requestAnimationFrame to throttle state updates
      animationFrameId = requestAnimationFrame(() => {
        setCursor({
          x: clientX,
          y: clientY,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
  },[])

    useEffect(() => {
      const newDiv = document.createElement('div');
    // Set some properties or content for the new div if needed
    let random = Math.floor(Math.random() * 6)
    newDiv.className = 'append fa-solid fa-music';
    newDiv.style.position = 'absolute';
  newDiv.style.left = cursor.x + 'px';
  newDiv.style.top =  cursor.y + 'px';
    newDiv.style.color = colors[random]
    // Append the new div to the document body or another element
    EffectRef.current.appendChild(newDiv);
    },[cursor])
  return (
    <>
        <Nav/>
        <section className="background">
        <video autoPlay controlsList="nodownload" muted loop>
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">

        </div>
   
        </section>
        <section className='hero-section'>
        <div className="div1">
          <h1>DISCOVER NEW MUSIC <span style={{color:"#F4DF70"}}>
             EVERYDAY</span></h1>
          <p>Get playlist and albums inspired by the artist and genres your'e listening</p>
          <div className="btn">
            <Link to="/home/*">
          <button className='get-started'>Get Started</button>
            </Link>
          </div>
          <div className='info'>
              <div className="creators">
                <span>10,000,000 +</span>
                <span className='text'>Music Creators</span>
              </div>
              <div className='rating'>
              <span>4.9 (<i className="fa-solid fa-star"></i>)</span>
              <span className='text'>Rating</span>
              </div>
              <div className="app">
              <i className="fa-brands fa-apple apple"></i>
              <i className="fa-brands fa-google-play"></i>
              </div>
          </div>
        </div>
        <div className="div2">
          <div className="image">
          <img src={Headset}/>          
          </div>
          <div className="text">
          <p>Listen to live music</p>
          </div>
          <div className='_detail'>
              <div className="costumer">
                <span>320k +</span>
                <span>Customer</span>
              </div>
              <div className="tracks">
                <span>100M +</span>
                <span>tracks</span>
              </div>
              <div className="download">
                <span>10M +</span>
                <span>Downloads</span>
              </div>
          </div>
        </div>
        </section>

        <Favorite/>
        <SneackPeak/>
        <WhatsNext/>
        <Download/>
      <Footer />
      <div className="effect" ref={EffectRef}>
      </div>
    </>
  )
}

export default LandingPage