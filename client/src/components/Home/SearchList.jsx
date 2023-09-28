import React, { useEffect } from 'react'
import '../../assets/css/home/searchList.css'
import { useState } from 'react'
import List from './List'
import axios from 'axios'
const SearchList = () => {
  const url = new URL(window.location.href);
  const [data,setData] = useState("")
  const [searchVal,setSearchVal] = useState(url.searchParams.get("search"))
  useEffect(() => {
    axios.get(`http://localhost:5000/api/search/${searchVal}`).then(res => {
      console.log(res.data.tracks.items)
      setData(res.data.tracks.items)
    }).catch(err => {
      console.log(err)
    })
  },[])
  return (
    <>
        <section className='searchList'>
          {data&& data.map((key,index) => (
            <a href={`dashboard?page=${key.artists[0].name}&selectedTrack=${key.id}`} className="s-card-list" key={index}>
      <div className="search-info">
        <div className="image">
          <img src={key.album.images[1].url} alt="asd" />
        </div>
        <div className='txt'>
            <h3>{key.album.name}</h3>
            <p>{key.artists[0].name}</p>
            <p className='list-date'>{key.album.release_date}</p>
        </div>
      </div>
      <div className="search-icon">
      <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
            </a>
          ))
      }
        </section>
    </>
  )
}

export default SearchList