// import MusicPlay from '../../assets/videos/music-play.mp4'
import { useContext ,useEffect, useRef, useState } from 'react'
import UserContext from '../contextProvider'
import axios from 'axios'
import "../../assets/css/home/main_jsx.css"

const Main = () => {
    const {isPlaying,setIsPlaying,allTracks,setOnplayTrack,onPlayTrack,setAllTracks,setIndex,myPlaylist} = useContext(UserContext)
      const url = new URL(window.location.href);
      const [music,setMusic] = useState(null)
      const [musicTracks,setMusicTracks] = useState([])
    const id = url.searchParams.get("page")
    const target = url.searchParams.get("selectedTrack")
    const [targetTr , setTargetTr] = useState("")
    // const selectedTrack = url.searchParams.get("selectedTrack")
    const [mLoading,setmLoading] = useState("block")
    const vid = useRef(null)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/selected_tracks/${target}`)
        .then(res1 => {
            axios.get(`http://localhost:5000/api/music/${id}`)
            .then(res => {
                setMusic(res1.data)
                setMusicTracks([res1.data,...res.data.datMusic.tracks.items])
                setAllTracks([res1.data,...res.data.datMusic.tracks.items])
                setOnplayTrack(res1.data)
            setmLoading("none")
            })
            .catch(err => {
                console.log(err)
            })
        }).catch(e => {
            console.log(e)
        })
       
    },[])
    const ChooseTrack = (index,track) => {
        setMusic(track)
        setIsPlaying(true)
        setOnplayTrack(track)
        setIndex(index)
    }
    const [open,setOpen] = useState("none")
    const [selectedList,setSelectedList] = useState("")
    const [targetTrack,setTargetTrack] = useState("")
    // useEffect(() => {
    //     if(isPlaying) {
    //         vid.current.play()
    //     } else {
    //         vid.current.pause()
    //     }
    // },[isPlaying])

    const AddtoPlaylist = (track) => {
        console.log(track)
        setOpen("block")
        setTargetTrack(track)
        setSelectedList("")
    }
    const SelectHandle = (target) => {
        setSelectedList(target)
    }   
        const AddHandle = () => {
            if(selectedList === "") return;
            axios.post("http://localhost:5000/list/add_track",{playlist:selectedList,track:targetTrack})
            .then(res => {
                setOpen("none")
                console.log(res)
            }).catch(e => {
                console.log(e)
            })
           
        }

   
    
  return (
    <>
    
    <div className="music-main loading" style={{display:mLoading}}>
    </div>
   
    <div className="music-main">
    {onPlayTrack &&
        <div className="music-main-wrap">
        <div className='music-img'>
        <img src={onPlayTrack && onPlayTrack.album.images[0].url} alt="" />
        </div>
        <div className="music-info">
            <div className='m-title'>
            <h3>{onPlayTrack.name.length >= 50 ? onPlayTrack.name.slice(0,50) + '...' :  onPlayTrack.name}</h3>
            <span>{onPlayTrack.artists[0].name}</span>
            </div>

            <div className='music-btn'>
            <button><i className="fa-regular fa-bookmark"></i> + </button>
            <button className='add-play-i-btn' onClick={() => AddtoPlaylist(onPlayTrack.id)}><span>Add to playlist </span><i className="fa-solid fa-table-list"></i> + </button>
            </div>
            <div className='date'>
                <span>Release Date: {onPlayTrack.album.release_date}</span>
            
            </div>
        </div>
        <div className="music-play-vid">
    <video ref={vid} autoPlay controlsList="nodownload" muted loop>
{/* <source src={MusicPlay} type="video/mp4" /> */}
Your browser does not support the video tag.
</video>
</div>
<i className="fa-solid fa-ellipsis-vertical main_music_add"></i>
    </div>
    }



    </div>

    <div className="box_where_to" style={{display:open}}>
        <div className="add-head">
        <h1>Add To Playlist</h1>
        <p>Choose Playlist</p>
        </div>
        <i onClick={() => setOpen("none")} className="fa-solid fa-xmark close_add_p"></i>
        <div className="add-container">

        {myPlaylist !== "err"? myPlaylist.map((key,index) => (
            <div  className="add-card" key={index} style={{border:selectedList === key.id ? "1px solid #fff":""}} onClick={()=> SelectHandle(key.id)}>
            <div className="add-images">
                <img src="https://i.scdn.co/image/ab67616d00001e026383f3d57f21108771c05323" alt="" />
            </div>
            <div className='playlis-name'>
                <span>{key.playlist_name}</span>
            </div>
            <button>

            </button>
        </div>
        ))
         :""
        }
        </div>
        <div className="add-btn">
        <button onClick={AddHandle} className='confirm'>
            Confirm
        </button>
        </div>
    </div>

    <div className='main-m-list'>
        <div className='m-list-header'>
        <i className="fa-solid fa-headset"></i><h1>Music List</h1>
        </div>
        {allTracks&& 
        allTracks.map((key,index) => (
        
        <div onClick={() => ChooseTrack(index,key)} className="m-list-choice " 
        style={{border: key.id === onPlayTrack.id ? "2px solid #fff" : ""}}
        key={index}>
            <div className="wrap-list-first">
            <h1 className='list-num'>{index + 1}</h1>
                <div className="list-img-wrap">

                <div className="image">
                    <img src={key.album.images[0].url} alt="" />
                </div>
                <div className="title">
                    <span>{key.name.length >= 20 ? key.name.slice(0,20) + '...' :  key.name}</span>
                </div>
                </div>
                </div>
                <div className="minutes">
                    <span>
                        {(() => {
                            let minutes = Math.floor(key.duration_ms / 60).toString();
                            let seconds =  (key.duration_ms - minutes * 60).toString();
                            return [0,minutes.slice(0,1),":",seconds.length!==1?seconds:`0${seconds}`].join("")
                        })()}
                    </span>
                </div>
               
                <div className="play-pause">
{key.id === onPlayTrack.id && 
<>
{isPlaying ? (
<i className="fa-solid fa-pause" onClick={() => setIsPlaying("asd")}></i>
) : (
<i className="fa-solid fa-play" onClick={() => setIsPlaying(true)} ></i>
)}
</>
}
{!key.id === onPlayTrack.id && (
<i className="fa-solid fa-play" onClick={() => setIsPlaying(true)}></i>
)}
</div>
        </div>
        ))
        }
     
    </div>

</>
  )
}

export default Main