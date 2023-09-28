import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './contextProvider'
import '../assets/css/myplaylist.css'
import axios from 'axios'
const Myplaylist = () => {
  const url = new URL(window.location.href);
  const {changeParam,setAllTracks,setOnplayTrack,onPlayTrack} = useContext(UserContext)
  const id = url.searchParams.get("id")
  const [playId,setPlayId] = useState(id)
  const [myTrackList ,setMyTrackList] = useState()
  const [loading,setLoading] = useState("none")
  const GetMyTracks = () => {
    axios.get(`http://localhost:5000/list/my_list_tracks/${id}`)
    .then(res => {  
      if(res.data === "err") {
        setMyTrackList(false)
        setLoading("none")
      }
      const trackList = []
      res.data.map((key) => {
        trackList.push(key.track)
      })
      if(!trackList) {
        setMyTrackList([])
      }
      console.log(res)
      axios.get(`http://localhost:5000/api/myList/${trackList.join("%2C")}`)
      .then(res => {
        console.log(res.data.tracks)
        setMyTrackList(res.data.tracks)
        console.log("hello")
        console.log(res)
        setLoading("none")
      }).catch(e => {
        console.log(e)
      })
    }).catch(e => {

    })
    console.log(id)
  }
  useEffect(() => {
    setLoading("flex")
    console.log("loading")
    GetMyTracks()
    console.log(changeParam)
  },[changeParam,id])
  const [ChooseId,setChooseId] = useState("")
  const ChooseToplay = (track,item) => {
    setChooseId(track)
    setAllTracks(myTrackList)
    setOnplayTrack(item)
  }
  return (
    <>
    <section className='my_play_list'>
        <div className="header_playlist">
            <h1>My Playlist</h1>
        </div>
        <div style={{display:loading}} className='loader-par'>
        <span className="loaders"></span>
        </div>
        <div className="track_playlist">
          {myTrackList? myTrackList.map((key,index) => (
            <div onClick={() => ChooseToplay(key.id,key)} className='myTrackList' key={index} style={{border: onPlayTrack.id === key.id ? "2px solid #830CB0":""}}>
                <div className="trackImage">
                  <img src={key.album.images[0].url} alt="" />
                </div>
                <div className="trackInfo">
                    <p className='first'>{key.name}</p>
                    <p className='second'>{key.artists[0].name}</p>
                </div>
            </div>
          )): <div className='noTracks'>
            <div>
              <span>No Tracks</span>
              <i className="fa-solid fa-hourglass-start"></i>
            </div>
            </div>}
        </div>
    </section>
    </>
  )
}

export default Myplaylist