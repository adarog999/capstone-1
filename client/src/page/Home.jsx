import React, { useState ,useRef,useEffect, useContext} from 'react'
import '../assets/css/home.css'
import Main from '../components/Home/Main'
import UserContext from '../components/contextProvider'
import { useParams ,Link} from 'react-router-dom'
import Chat from '../components/Home/Chat'
import decodeToken from 'jwt-decode'
import axios from 'axios'
import SearchList from '../components/Home/SearchList'
import SearchBar from '../components/Home/SearchBar'
import User from './User'
import SpotifyPlayer from 'react-spotify-web-playback'
import HomeMain from '../components/Home/HomeMain'
import Cookies from 'js-cookie'
import Headset from "../assets/images/headset.png"
// import LoginSporify from '../components/LoginSporify'
// import UseAuth from '../components/UseAuth'
import Myplaylist from '../components/Myplaylist'
const Home = () => {
    // code
    // const url = new URL(window.location.href);
    // const code = url.searchParams.get("code")
    // console.log(code)
    // code
const [allTracks,setAllTracks] = useState()
const [index,setIndex] = useState(0)
  const accessToken = Cookies.get("accessToken") || null
  const [onPlayTrack,setOnplayTrack] = useState("")
    if ('permissions' in navigator && 'UA' in navigator.permissions) {
        // Feature is supported, set it in the Permissions-Policy header
        document
          .querySelector('iframe')
          .sandbox.add('ch-ua-form-factor');
      }
    const [isPlaying,setIsPlaying] = useState(false)
    const token = useContext(UserContext)
    const [decode,setDecode] = useState(token ? decodeToken(token) : '')
    const {main_page} = useParams()
    const audio = useRef(null)
    const [userP,setUserP] = useState("")
    const [track,setTrack] = useState([])
    const [play,setPlay] = useState(false)
    const [changeProfile,setChangeProfile] = useState(false)
      useEffect(() => {
          if (isPlaying) {
            // audio.current.play();
            setPlay(true)
          } else {
            // audio.current.pause();
            setPlay(false)
          }
      }, [isPlaying]);
     
    // console.log(decode.userId)
      
    useEffect(() => {
        if(decode.userId) {
            axios.get(`http://localhost:5000/profile/${decode.userId}`)
            .then(res => {
                // console.log(res.data,'asd')
                setUserP(res.data)
                setChangeProfile(false)
            })
            .catch(err => {
                // console.log(err)
            })
        }
    },[changeProfile])
    const [addOpen,setAddOpen] = useState("none")
    const valueAdd = useRef(null)
    const [loginReqLib,setLoginReqLib] = useState("none")
    const [playInfo,setPlayInfo] = useState({
        playlist: ""
    })
    const [added,setAdded] = useState(0)
    const [errTxt,seterrTxt] = useState("none")
    const AddPlayList = () => {
        console.log(userP,'this is user ')
        if(userP === "") {
            setLoginReqLib("block")
            return;
        }
        setAddOpen("block")
        valueAdd.current.value = ""
    }

    const SumbitPlaylist = () => {
        console.log(userP.user)
        if(playInfo.playlist === "") {
            seterrTxt("block")
            return;
        };
        axios.post('http://localhost:5000/list/playlist',{...playInfo ,user:userP.user})
        .then(res => {
            console.log(res)
            setAdded(added + 1)
            setAddOpen("none")
        })
        .catch(err => {
            console.log(err)
        })
    }
    const [myPlaylist,setMyPlaylist] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/list/my_list/${decode.userId}`)
        .then(res => {
            console.log(res.data)
            setMyPlaylist(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    },[added])
    const Next = () => {
        if(index === allTracks.length - 1) return
        setOnplayTrack(allTracks[index + 1])
        setIndex(index + 1)
    }
    const Prev = () => {
        if(index === 0) return;
        setOnplayTrack(allTracks[index - 1])
        setIndex(index - 1)
    }

    const [topart,setTopArt] = useState("")
    useEffect(() => {
      axios.get("http://localhost:5000/api/top10")
      .then(res => {
        setTopArt(res.data.tracks)
        console.log(res.data.tracks)
        console.log(topart)
      })
      .catch(err => {
        console.log(err)
      })
    },[])
    const [settingOn,setSettingOn] = useState("none")
    const Logout = () => {
        Cookies.remove('token')
        window.location.replace("/")
    }
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id")
    const [changeParam,setChangeParam] = useState('')
    const ChangeHandle = (idParam) => {
        setChangeParam(idParam)
    }
    const [libColor,setLibColor] = useState([
        "#007D3D","#E94560","#A112A5","#840CB0","#725E32","red","blue","yellow","green","violet"
    ])
  return (
    <>

    <section className='home'>
            <div className="home-cont">
                <aside className='left-aside'>
                    <div className='aside-banner'>
<div className="setting-help" style={{display:settingOn}} onClick={() => setSettingOn("none")}></div>
                        
                    <div className="setting" style={{display:settingOn}} >
                        <Link onClick={() => setSettingOn('none')} to="/home/profile">Account</Link>
                        <button onClick={Logout}>Logout</button>
                    </div>
                    <div className='profile-pic'>
                        <img src={userP.image ?`http://localhost:5000/images/${userP.image}`: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="asd" />
                    </div>
                    {decode !== "" ?
                        <div className='aside-user-info'>
                        <span className='wel'>Welcome !</span>
                        <span className='name' style={{letterSpacing: "1.5px"}}>{decode.username} </span>
                        <i className="fa-solid fa-gear settings"  onClick={() => setSettingOn(settingOn === "none" ? "flex":"none")}></i>
                    </div>: 
                    <a href='/login' style={{padding: "10px 35px",border:"1px solid #fff",borderRadius:"7px",color:"#fff",textDecoration:"none",letterSpacing:"1.5px"}}>Login</a>
                    }
                    </div>
                    <div className='navigator'>
                            <div className="library">
                                <div className='lib-title' style={{position:"relative"}}>
                                <h1>Library</h1>
                                <i className="fa-solid fa-plus clas
                                add-playlist" onClick={AddPlayList}></i>
                                 <span style={{position:"absolute",top:"0px",right:"40px",color:"red",display: loginReqLib}}>Login Required <span style={{marginLeft:"5px",fontSize:"20px",cursor:"pointer"}}
                                 onClick={() => setLoginReqLib("none")}
                                 >&times;</span></span>
                                </div>
                                <div className='lib-choice' >
                                   
                                    <span>Favorite</span>
                                    <span>My Playlist</span>
                                </div>
                            </div>
                            <div className="lib-list">
                                {myPlaylist !== "err" ? myPlaylist.map((key,index) => (
                                    <Link onClick={()=> ChangeHandle(key.id)} to={`/home/myplaylist?id=${key.id}`} className="lib-cards" key={index} style={{textDecoration:"none",color:"#fff",border:parseInt(id) === key.id ? "1px solid #fff":""}}>
                                    <div className="lib-images" style={{backgroundColor: libColor[Math.floor(Math.random() * 10)]}}>
                                        
                                    </div>
                                    <div className='playlis-name'>
                                        <span>{key.playlist_name}</span>
                                        <span>Playlist. {decode.username}</span>
                                    </div>
                                </Link>
                                    ))
                                :
                                    <div className="lib-cards" style={{padding: "20px",letterSpacing: "1.5px"}}>
                                    <h1 style={{letterSpacing: "1.5px"}}>No Playlist</h1>
                                </div>
                                }
                              

                            </div>
                    </div>

                    <div className='track_side'>
                        <div className="play-track-side">
                            {onPlayTrack? 
                            <>
                            <div className="image">
                            <img src={onPlayTrack&& onPlayTrack.album.images[0].url} alt="" />
                            </div>
                            <div className='track_info'>
                            <span>{onPlayTrack && onPlayTrack.name.length >= 20 ? onPlayTrack.name.slice(0,21) + '...': onPlayTrack.name}</span>
                            <span>{onPlayTrack && onPlayTrack.artists[0].name  >= 10 ? onPlayTrack.artists[0].name.slic(0,11) + "..." : onPlayTrack.artists[0].name}</span>
                            </div>
                            <div className="track_control">
                            <i className="fa-solid fa-square-caret-left" onClick={Prev}></i>
                            {isPlaying == true ?<i className="fa-solid fa-pause off" onClick={() => setIsPlaying(false)}></i> :
        <i className="fa-solid fa-play on"onClick={() => setIsPlaying(true) }></i>
        }
                            <i className="fa-solid fa-square-caret-right" onClick={Next}></i>
                            </div>
                            </>:
                            <div className='image' style={{height: "100%",width: "100%",backgroundColor: "#1F6E8C",maxHeight:"220px"}}>
                                <img src={Headset} alt="headset" style={{height: "100%",width: "100%",objectFit:"contain"}}/>
                            </div>
                            }

                        </div>
                    </div>
                </aside>
                <>
                <div className='main'>
                    {main_page !== "chat" ? <SearchBar/>:''}
                <UserContext.Provider value={{isPlaying,setIsPlaying,decode,allTracks,setOnplayTrack,onPlayTrack,setAllTracks,setIndex,myPlaylist,changeParam }}>
                    {main_page === "dashboard" ?
                        <Main />:main_page === "chat"?
                        <Chat/> : main_page === "search" ? <SearchList/> :main_page === "profile" ? <User user={decode} profile={userP} change={setChangeProfile}/> : main_page === "myplaylist" ? <Myplaylist/>: <HomeMain/> 
                    }
                </UserContext.Provider>
                </div>

                <aside className='right-aside'>
                    <div className="home_btn">
                        <Link to={"/home/*"}>
                            Musika Ph
                        </Link>
                    </div>
                    <div className='top-art'>
                        <h1>Top Artist</h1>
                        {topart? 
                        topart.map((key,index) => (
                            <div className='art-list' key={index}>
                            <div className='art-img'>
                                <img src={key.album.images[1].url} alt="artist-image" />
                            </div>
                            <div>
                                <h5>{key.artists[0].name}</h5>
                                <p>{key.album.release_date}</p>
                            </div>
                            </div>
                        ))  :
                        <></>  
                    }
                    </div>
                    <div className='top-genre'>
                        <h1>Top Genre</h1>
                        <div className='genre-btn'>
                        <button>Rock</button>
                        <button>Pop</button>
                        <button>Hiphop</button>
                        <button>FFM</button>
                        <button>Romance</button>
                        </div>
                    </div>
                </aside>
                </>

             
            </div>
    </section>
    {onPlayTrack&&

    <div className="play">
        <div className='music-info'>
            <div className="image">
                <img src={onPlayTrack&& onPlayTrack.album.images[0].url} alt="asd" />
            </div>
            <div className="info-text">
                <h4>{onPlayTrack.name.length >= 20 ? onPlayTrack.name.slice(0,21) + '...': onPlayTrack.name}</h4>
                <p>{onPlayTrack.artists[0].name}</p>
            </div>
        </div>
        <div className='foot-play-btn'>
        <i className="fa-solid fa-backward-step back" onClick={Prev}></i>
        {isPlaying == true ?<i className="fa-solid fa-pause off" onClick={() => setIsPlaying(false)}></i> :
        <i className="fa-solid fa-play on"onClick={() => setIsPlaying(true) }></i>
        }
        <i className="fa-solid fa-forward-step forwar" onClick={Next}></i>
        </div>
        <div className='music-minute'>
            <div className="tracker"></div>
            <div className='min'>
                <span>0.01</span>
                <span>0.09</span>
            </div>
        </div>
        <div className='play-audio'>
        <i className="fa-solid fa-volume-high"></i>
        <div className='vol'></div>
        </div>
        <div className='play-icon'>
        <i className="fa-regular fa-heart"></i>
        </div>
    </div>
    }
{/* popUp-add-playlist */}
<div className="play-pop-up-helper" style={{display:addOpen}}>
</div>
    <div className="popUp-add-playlist" style={{display:addOpen}}>
        <span className='err-txt' style={{color:"red",display:errTxt}}>Please Add Playlist Name</span>
    <i className="fa-solid fa-xmark close" onClick={() => setAddOpen("none")}></i>
        <h1>Create Playlist</h1>
        <div className='inp'>
            <label htmlFor="play-name">Playlist Name</label>
            <input type="text" ref={valueAdd} id='play-name' onInput={(e) => setPlayInfo({...playInfo , playlist:e.target.value})}/>
        </div>
        <button onClick={SumbitPlaylist}>Create +</button>
    </div>
    {/* popUp-add-playlist */}
  
    </>
  )
}

export default Home