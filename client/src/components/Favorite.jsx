import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const Favorite = () => {
    // const [artnameStyle,setArtnameStyle] = useState({
        
    // })
    const slideRef = useRef(null)
    const [move,setMove] = useState(0)
    const [x,setX] = useState(0)
    const [slide,setSlide] = useState({
        isDown: false,
        startX: 0,
        scrollLeft:0
    }) 
    let timeoutId;
    const SlideHandle = (e,param2) => {
        if (param2 === "mousedown") {
            setSlide({
              ...slide,
              startX: e.pageX - slideRef.current.offsetLeft,
              scrollLeft: slideRef.current.scrollLeft,
              isDown: true,
            });
          } else if (param2 === "mouseleave" || param2 === "mouseup") {
            setSlide({ ...slide, isDown: false });
          } else {
            if (!slide.isDown) return;
            e.preventDefault();
        
            clearTimeout(timeoutId);
        
            timeoutId = setTimeout(() => {
              const newScrollLeft = slide.scrollLeft - (e.pageX - slideRef.current.offsetLeft - slide.startX);
              slideRef.current.scrollLeft = newScrollLeft;
            }, 16); // Adjust the debounce interval as needed
          }
    }
    const [top10,setTop10] = useState()
    useEffect(() => {
      axios.get("http://localhost:5000/api/top10")
      .then(res => {
        setTop10(res.data.tracks)
        console.log(res.data.tracks)
      })
      .catch(err => {
        console.log(err)
      })
    },[])
  return (
    <section className='favorite'>
          <div className='fav-title'>
            <div className='fav-text'>
              <h1 className='top-10'>Our weekly top 10</h1>
            </div>
            <button>See more.<span className="material-symbols-outlined">
arrow_forward
</span></button>
          </div>
          <div 
          className='artist-images'
          
          >
            <div 
          ref={slideRef}
            className="image-wrapper"
            onMouseDown={(e) => SlideHandle(e,"mousedown")}
          onMouseLeave={(e) => SlideHandle(e,"mouseleave")}
          onMouseUp={(e) => SlideHandle(e,"mouseup")}
          onMouseMove={(e) => SlideHandle(e,"mousemove")}
            >
            {top10&& 
            top10.map((key,index) => (
            <div className='img' key={index}>
              <img src={key.album.images[0].url} alt="asd" />
              <p className='art-name'>{key.artists[0].name}</p>
            </div>
            ))
            }
            
            
            </div>

          </div>
          {/* < Testimonial /> */}
          <div className="pop-cul">
          <h1>One <div className='pop1'> music</div>. One <div className='pop2'> culture</div>. One <div className='pop3'>PH</div>.</h1>
          </div>
        </section>
  )
}

export default Favorite