import React, { useState } from 'react'
import '../../assets/css/home/m-list.css'
import { Link } from 'react-router-dom'
const List = (props) => {
  const {info} = props

  const image = info ? info.album.images[0].url : ''
  const name = info ?info.album.name  : ''
  const artist = info ?info.artists[0].name  : ''
  const date = info ? info.album.release_date  : ''
  const id = info ? info.id : ""
  return (
    <a href={`dashboard?page=asd&selectedTrack=${id}`}  className="s-card-list" >
    <div className="search-info">
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className='txt'>
          <h3>{name}</h3>
          <p>{artist}</p>
          <p className='list-date'>{date}</p>
      </div>
    </div>
    <div className="search-icon">
    <i className="fa-solid fa-ellipsis-vertical"></i>
    </div>
  </a>
  )
}

export default List