import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/EditProfile.css';
import { useContext } from 'react';
import UserContext from './contextProvider';
import axios from 'axios';

const EditProfile = () => {

  const { openedit, setOpenEdit,user,profile, change} = useContext(UserContext);
  const [userInfo,setUserInfo] = useState()
  useEffect(() => {
    setUserInfo({
      name: profile.name  ,
      username: user.username,
      phonenumber: profile.phonenumber,
    })
  },[openedit])
  const InfoInput = (e) => {
    const {name,value} = e.target
    setUserInfo({...userInfo,[name]:value})
  }
  const [image, setImage] = useState(null); // Use null instead of an empty string for image state
  const [file,setFile] = useState(null)
  const ImageHandle = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        // Set the image state to the data URI
        setImage(e.target.result);
        setFile(selectedImage)
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const [errors,setErros] = useState("")
  const inpImg = useRef(null)
  const Update = () => {
    console.log(userInfo)
    if(!file) {
      setErros("Please input a image")
      return;
    }
    const formdata = new FormData()
    formdata.append('image',file)
    formdata.append('name', userInfo.name || "")
    formdata.append('phonenumber',userInfo.phonenumber|| "")
    console.log(formdata)
    axios.post(`http://localhost:5000/update_profile/${user.userId}`,formdata)
    .then(res => {
      change(true)
      setImage(null)
      setOpenEdit(false)
    })
    .catch(err => {
      return
    })
  }
  console.log(user.userId)
  return (
    <>
    {userInfo&& 
      <section style={{ display: openedit ? 'block' : 'none' }} className='editProf-container'>
       
        <div className='editProfile'>
          {errors && 
          <div className="errors-edit">
          <p>{errors}</p>
          <i className="fa-solid fa-xmark" onClick={() => setErros("")}></i>
        </div>
          }
          <h1 className='head'>Edit Profile</h1>
          <div className='image'>
            {/* Check if image is available before rendering */}
            {image && <img src={image} alt="Selected Image" />}
          </div>
          <input type="file" ref={inpImg} onChange={ImageHandle} accept='image/*' className='inp-img'/> {/* Added the wildcard to accept any image type */}
          <button onClick={() => inpImg.current.click()} className='choose-btn'>Choose Profile Picture</button>

          <div className='input'>
            <label htmlFor='name'>Name</label>
            <input type='text' value={userInfo.name || ""} name='name' id='name' 
            onChange={InfoInput}
            />
          </div>
          <div className='input'>
            <label htmlFor='username'>Username</label>
            <input type='text' value={userInfo.username} name="username"  onChange={InfoInput} id='username' />
          </div>
          <div className='input'>
            <label htmlFor='phonenumber'>Phonenumber</label>
            <input type='text'  value={userInfo.phonenumber || ""} onChange={InfoInput} name='phonenumber'  id='phonenumber' />
          </div>
          <div className='save' onClick={Update}>
            <button>SAVE</button>
          </div>
          <button className='close' onClick={() => setOpenEdit(false)}>
            Close
          </button>
        </div>
      </section>
    }

    </>
  );
};

export default EditProfile;