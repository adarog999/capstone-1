import { useState } from 'react';
import '../../assets/css/login-reg/register.css'
import fbIcon from '../../assets/images/fb-icon.png';
import googleIcon from '../../assets/images/google-icon.png';
import instaIcon from '../../assets/images/insta-icon.png';
import welcomeIm from '../../assets/images/login-w.png'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
const Register = () => {
    let navigate = useNavigate()
    const [isSigning,setIsSigning] = useState("Sign Up")
    const [validating,setValidating] = useState("none")
    const [form,setForm] = useState({
        username:'',
        email:'',
        password:'',
        password2:''
    })
    const [error,setError] = useState("")
    const [passType,setPassType] = useState({
        password1: "password",
        password2: "password"
    })
    const Show_Unshow_Pass = (e) => {
        const {name} = e.target.dataset
        console.log(name)
        setPassType({
            ...passType , 
            [name]:passType[name] == "password" ? "text" : "password"
        })
    }
    const FormHandle = e => {
        const {name,value} = e.target
        setForm({
            ...form,[name]:value
        })
    }
    const CloseError = () => {
        setError("")
    }
    const SubmitForm = e => {
        e.preventDefault()
        console.log(form)
        if(!form.password || !form.password2 || !form.username || !form.username) {
            setError("Please fill all fields")
            return;
        }
        setValidating("flex")
        setError("")
        Axios.post('http://localhost:5000/createuser',form)
        .then(res => {
            console.log(res.data.success)
            localStorage.setItem("success",res.data.success)
            navigate("/login")
        })
        .catch(err => {
            console.log(err.response.data.error)
            setError(err.response.data.error)
        setValidating("none")
        })
    }
  return (
    <section className='reg-page'>
  <div className='loader-parent' style={{display:validating}}>
    <span className="loader"></span>
    <p className='loader-text'>Validating . . .</p>
    </div>
    <div className='reg-container'>
  
    {error &&
    <div className='register-error'>
        <span className="material-symbols-outlined warning">
            warning
        </span>
        <span className='text'>{error}</span>
        <span className="material-symbols-outlined close" onClick={CloseError}>
        cancel_presentation
        </span>
    </div>
    }


    <div className='reg-text'>
        <div className="welcome">
            <h1>Welcome to Musika PH</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, eum? Lorem ipsum dolor sit amet.</p>
        </div>
            <div className="image">
            <img src={welcomeIm} alt="" />
            </div>
    </div>
    <div className='reg-form'>
            <h1 className='title'>Sign Up</h1>
            
        <form action="" onSubmit={SubmitForm}>
            <div className='input-wrapper'>
                <label htmlFor="username">Username</label>
                <input 
                type="text" 
                name='username' 
                id='username'
                onInput={FormHandle}
                />
            </div>
            <div className='input-wrapper'>
            <label htmlFor="email">Email</label>
                <input 
                type="email" 
                name='email' 
                id='email'
                onInput={FormHandle}
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor="password">Password</label>
                <input 
                type={passType.password1} 
                name='password' 
                id='password'
                onInput={FormHandle}
                />
                {passType.password1 == "password" ?

                <span data-name="password1" className="material-symbols-outlined eye" onClick={Show_Unshow_Pass}>
                visibility
                </span>
                :
                <span data-name="password1" className="material-symbols-outlined eye" onClick={Show_Unshow_Pass}>
                visibility_off
                </span>
                }

            </div>
            <div className='input-wrapper'>
                <label htmlFor="password2">Confirm Password</label>
                <input 
                type={passType.password2}
                name='password2' 
                id='password2'
                onInput={FormHandle}
                />
                 {passType.password2 == "password" ?
                <span data-name="password2" className="material-symbols-outlined eye" onClick={Show_Unshow_Pass}>
                visibility
                </span>
                :
                <span data-name="password2" className="material-symbols-outlined eye" onClick={Show_Unshow_Pass}>
                visibility_off
                </span>
                }
            </div>
            
            <div className='button'>
                <button>{isSigning}</button>
            </div>
            <p className='or'>or</p>
            <div className="choice">
                <button type='button'><img src={fbIcon} alt="" /></button>
                <button type='button'><img src={instaIcon} alt="" /></button>
                <button type='button'><img src={googleIcon} alt="" /></button>
            </div>
            <div className='no_acc'>
                <span>already have an account?<Link to='/login'>Sign In</Link></span>
            </div>
        </form>
    </div>

    </div>

</section>
  )
}

export default Register