import React, { useRef, useState } from 'react'

const WhatsNext = () => {
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
    const [json,setJson] = useState({
      "artist1": [
        {"date": "October 6,2023",
        "time": "8:00 pm",
        "artist_name": "Erik Santos",
        "venue": "Mall of Asia Arena",
        "image": "https://i.mydramalist.com/kXOyvc.jpg"
    }
    ],
    "artist2": [
        {"date": "October 27, 2023",
        "time": "12:00 PM",
        "artist_name": "Sharon Cuneta",
        "venue": "Mall of Asia Arena",
        "image": "https://sa.kapamilya.com/absnews/abscbnnews/media/2018/news/07/24/20180724_sharon.jpg"
    }
    ],
    "artist3": [
        {"date": "October 1, 2023",
        "time": "5:00 PM",
        "artist_name": "TJ Monterde",
        "venue": "Araneta Coliseum",
        "image": "https://i.discogs.com/UJCcJOfANFyAOtIrWhBcgyPBlNBOjp8yykJ7JJrlZrs/rs:fit/g:sm/q:90/h:569/w:539/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTYwMTg5/NzItMTYzMTM3MjEz/OC02NzQ5LmpwZWc.jpeg"
    }
    ],
    "artist4": [
        {"date": "October 11, 2023",
        "time": "7:00 PM",
        "artist_name": "Freddie Aguilar",
        "venue": "Philippine Arena",
        "image": "https://alchetron.com/cdn/freddie-aguilar-c01b9034-1229-4790-b722-2e5aabafdf0-resize-750.jpg"
    }
    ],
    "artist5": [
        {"date": "November 5, 2023",
        "time": "5:00 PM",
        "artist_name": "6 Cycle Mind",
        "venue": "Mall of Asia Arena",
        "image": "https://www.adobomagazine.com/wp-content/uploads/2021/12/6cyclemind-returns-with-soaring-rock-anthem-Langit-HERO.jpg"
    }
    ],
    "artist6": [
        {"date": "November 12, 2023",
        "time": "8:00 PM",
        "artist_name": "Kamikazee",
        "venue": "Smart Araneta Coliseum",
        "image": "https://finitefam.com/wp-content/uploads/2020/01/84158638_3295100917172628_6125259324198486016_o-1024x683.jpg"
    }
    ],
    "artist7": [
        {"date": "November 18, 2023",
        "time": "3:00 PM",
        "artist_name": "Parokya ni Edgar",
        "venue": "Philippine Arena",
        "image": "https://www.wish1075.com/wp-content/uploads/2016/10/parokya.jpg"
    }
    ],
    "artist8": [
        {"date": "December 5,2023",
        "time": "4:00 PM",
        "artist_name": "Flow G",
        "venue": "Smart Araneta Coliseum",
        "image": "https://global-uploads.webflow.com/62158cc7e1cd8f0ec3729390/63ee76702d2cd482f98ae52b_flow-g-XsvCm.jpeg"
    }
    ],
    "artist9": [
        {"date": "December 17, 2023",
        "time": "6:00 PM",
        "artist_name": "December Avenue",
        "venue": "Mall of Asia Arena",
        "image": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/December_Avenue_%28band%29.jpg/330px-December_Avenue_%28band%29.jpg"
    }
    ],
    "artist10": [
        {"date": "December 25, 2023",
        "time": "6:00 PM",
        "artist_name": "Andrew E",
        "venue": "Philippine Arena",
        "image": "https://images.genius.com/787723318c79accabd37982bb912697d.478x478x1.jpg"
    }
    ]
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
  return (
    <section className='favorite'>
          <div className='fav-title'>
            <div className='fav-text'>
              <h1 className='top-10'>Discover what's next</h1>
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
          {Object.keys(json).map((artistKey) => (
        <div key={artistKey}>
          {json[artistKey].map((event, index) => (
            // <div key={index}>
            //   <h2>{event.artist_name}</h2>
            //   <p>Date: {event.date}</p>
            //   <p>Time: {event.time}</p>
            //   <p>Venue: {event.venue}</p>
            //   <img src={event.image} alt={event.artist_name} />
            // </div>
            <div className='img' key={index}>
            <img src={event.image} alt="asd" />
            <p className='art-name'>{event.artist_name}</p>
          </div>
          ))}
        </div>
      ))}
          {/* {
              json.map((key,index) => {
                <div className='img' key={index}>
                <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="asd" />
                <p className='art-name'>Juan Dela Cruz</p>
              </div>
              })
            } */}
            
            </div>

          </div>
          
        </section>
  )
}

export default WhatsNext