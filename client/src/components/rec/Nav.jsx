import React, { useEffect } from 'react'
import '../assets/css/nav/Nav.css'
import { Link } from 'react-router-dom'
import { useState , useContext } from 'react'
import UserContext from './contextProvider'
import decodeToken from 'jwt-decode'
import Cookies from 'js-cookie'
const Nav = () => {
    const [scroll,setScroll] = useState(0)
    const [decode,setDecoded] = useState(null)
    const [drop,setDrop] = useState(false)
    const token = useContext(UserContext)
    useEffect(() => {
        if (token) {
          const decodedToken = decodeToken(token);
          setDecoded(decodedToken);
        } else {
          setDecoded(null);
        }
      }, [token]); 
      const DropHandle = () => {
        setDrop(!drop)
      }
    window.addEventListener('scroll',()=> {
        setScroll(window.scrollY)
        console.log(window.scrollY)
    })
    const Logout = () => {
        Cookies.remove("token")
        window.location.replace("/login")
    }
  return (
    <nav style={{backgroundColor: scroll > 650 ? '#ffff':'#000'}}>
        <div className='navChild'>
            <div className="banner"><h1>Musika PH</h1></div>
            {/* <div>
                <form action="">
                    <input type="text" />
                    <button>Search</button>
                </form>
            </div> */}
            <ul>
                {decode === null ? 
                <li>
                    <div className='isLogin'>
                    <Link to="/login"className='login-btn'>Login<span className="material-symbols-outlined">
                    login
                    </span></Link>
                        <Link to="/sign-up" className='signUp-btn'>Sign Up<span className="material-symbols-outlined">
                        person_add
                        </span></Link>
                    </div>
                </li> : 
                <>
                <button className='profile-btn-login' onClick={DropHandle}>
                    <div>
                    <i className="fa-regular fa-user"></i>
                    <span>{decode.username}</span>
                    </div>
                    {drop?

                        <i className="fa-solid fa-angle-down"></i>
                        :
                        <i className="fa-solid fa-angle-up"></i>
                    }
                    {drop?
                        <>
                        <div className="drop-content">
                        <Link className='acc' to="home/profile">

                    <span>Account</span>
                    <i className="fa-solid fa-gear"></i>
                        </Link>

                        <div onClick={Logout}>

                    <a href='#'>Logout</a>
                    <i className="fa-solid fa-right-from-bracket"></i>
                        </div>
                        
                    <i className="fa-solid fa-play caret"></i>
                </div> <div className="close_drop"></div></>:''
                    }
                </button>
               
                </>
                }

            </ul>
        </div>
    </nav>
  )
}

export default Nav