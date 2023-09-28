import  { useState } from 'react'
import '../../assets/css/login-reg/login.css'
import fbIcon from '../../assets/images/fb-icon.png';
import googleIcon from '../../assets/images/google-icon.png';
import instaIcon from '../../assets/images/insta-icon.png';
import welcomeIm from '../../assets/images/login-w.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true
const Login = () => {
    let navigate = useNavigate()
    const [successReg,setSuccessReg] = useState(localStorage.getItem("success") || "")
    const [err,setErr] = useState("")
    const [validating,setValidating] = useState("none")
    const [signingIn,setSigningIn] = useState("Sign In")
    const [form , setForm] = useState({
        username:"",
        password: ""
    })
    const [showPass,setShowPass] = useState("password")
    const FormHandle = (e) => {
        const {value,name} = e.target
        setForm({
            ...form , [name]:value
        })
    }
    const ShowPass = (e) => {
        setShowPass(showPass == "password" ? "text" : "password")
    }
    const Login = (e) => {
        e.preventDefault()
        if(!form.username || !form.password) {
            setErr("Please Fill All Fields")
            return;
        }
        console.log(form)
        setValidating("flex")
        setErr("")
        setSigningIn("Signing In ...")
        axios.post('http://localhost:5000/login',form,{
            withCredentials: true
        })
        .then(res => {
            setSigningIn("Sign In")
            localStorage.removeItem("success")
            window.location.replace("home/*")
        })
        .catch(e => {
            setErr(e.response.data.error)
            setValidating("none")
            setSigningIn("Sign In")
        })

    }
    const CloseErr = () => {
        setErr("")
    }
    const CloseSuccess = () => {
        localStorage.removeItem("success")
        setSuccessReg("")
    }
  return (
        <section className='login-page'>

<div className='loader-parent' style={{display:validating}}>
    <span className="loader"></span>
    <p className='loader-text'>Validating . . .</p>
    </div>

            <div className='login-container'>
                {successReg && 
                    <div className='successReg'><span>{successReg}</span>
                    <i className="fa-solid fa-xmark" onClick={CloseSuccess}></i>
                    </div>
                }
            {err &&
            <div className="login-error">
            <span className="material-symbols-outlined warning">
            warning
        </span>
        <span className='text'>{err}</span>
        <span className="material-symbols-outlined close" onClick={CloseErr}>
        cancel_presentation
        </span>
            </div>
            }

            <div className='login-text'>
                <div className="welcome">
                    <h1>Welcome to Musika PH</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, eum? Lorem ipsum dolor sit amet.</p>
                </div>
                    <div className="image">
                    <img src={welcomeIm} alt="" />
                    </div>
            </div>
            <div className='login-form'>
                    <h1 className='title'>Sign In</h1>
                <form action="" onSubmit={Login}>
                    <div className='input-wrapper'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username'
                        name='username'
                        onInput={FormHandle} 
                        placeholder='Enter Username'/>
                        
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor="password">Password</label>
                        <input type={showPass}id='password' 
                        name='password'
                        onInput={FormHandle} placeholder='Enter Password'/>
                        {showPass == "password" ?

                            <span onClick={ShowPass} className="material-symbols-outlined eye">
                        visibility
                        </span>
                        :
                        <span onClick={ShowPass}  className="material-symbols-outlined eye">
                        visibility_off
                        </span>
                        }
                    </div>
                    <div className='forgot'>
                        <Link to="/">Forgot password?</Link>
                    </div>
                    <div className='button'>
                        <button>{signingIn}</button>
                    </div>
                    <p className='or'>or</p>
                    <div className="choice">
                        <button type='button'><img src={fbIcon} alt="" /></button>
                        <button type='button'><img src={instaIcon} alt="" /></button>
                        <button type='button'><img src={googleIcon} alt="" /></button>
                    </div>
                    <div className='no_acc'>
                        <span>don't have an account?<Link to='/sign-up'>Sign Up</Link></span>
                    </div>
                </form>
            </div>

            </div>

        </section>
  )
}

export default Login