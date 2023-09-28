import React, { useEffect, useState } from 'react'
import '../assets/css/user.css'
import EditProfile from '../components/EditProfile'
import UserContext from '../components/contextProvider'
const User = (props) => {
    const {user,profile,change} = props
    const [userProfile,setUserProfile] = useState("")
    useEffect(() => {
        setUserProfile(profile)
    },[profile])
    const [openedit,setOpenEdit] = useState(false) 
    const EditProfileBtn = () => {
        setOpenEdit(!openedit)
    }
  return (
    <>
    <section className='user-page'>
       
        <div className="user-profile">
            <div className="info-wrapper">
            <div className="profile-image">
                <img src={profile.image &&`http://localhost:5000/images/${profile.image}`} alt="" />
            </div>
            <div className='info-text'>
                <p>Profile.</p>
                <div>
                <p>@{user.username?user.username: "Add Name"}</p>
                <p className='fullname'>{profile.name?profile.name: "-Full Name-"}</p>
                </div>
                <div className='following'>
                    <span>Following</span>
                    <span>Playlist</span>
                </div>
            </div>
            </div>
            <button className='edit-btn' onClick={EditProfileBtn}><i className="fa-solid fa-pen-to-square"></i>Edit</button>
        </div>
    </section>  
    <section>
        <div>

        </div>
    </section>
    <UserContext.Provider value={{openedit ,setOpenEdit,user,profile,change} }>
    <EditProfile/>
    </UserContext.Provider>
    </>
  )
}

export default User