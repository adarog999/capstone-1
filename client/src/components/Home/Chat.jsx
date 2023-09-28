import React, { useEffect, useRef, useState } from 'react'
import '../../assets/css/home/chat.css'
import {useContext} from 'react'
import UserContext from '../contextProvider'
import axios from 'axios'
const Chat = () => {
    const {decode} = useContext(UserContext) 
    const [form,setForm] = useState({
        userId: decode.userId,
        message: ''
    })
    const chatBox = useRef(null) 
    const InpMsg = (e) => {
        const {value} = e.target
        setForm({...form,message:value})
        console.log(form)
    }
    
    const [messages,setMessages] = useState([])
    useEffect(() => {
        
        axios.get("http://localhost:5000/chat/get_msg")
        .then(res => {
            setMessages(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    },[messages])
    useEffect(() => {
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
    },[messages.length])
    const SendMsg = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/chat/send_msg',form)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
    }
  return (
    <>
    <section className='chat-container'>
        <div className='chat-header'>
        <div className="chat-head-txt">
        <i className="fa-solid fa-ellipsis"></i>
        <span>Live Chat Members</span>
        </div>
        <div className="member">
            <div className="image">
                <img src="https://images.unsplash.com/photo-1595623238469-fc58b3839cf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9ja3N0YXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="asd" />
            </div>
            <div className="image">
                <img src="https://images.unsplash.com/photo-1595623238469-fc58b3839cf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9ja3N0YXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="asd" />
            </div>
            <div className="image">
                <img src="https://images.unsplash.com/photo-1595623238469-fc58b3839cf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9ja3N0YXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="asd" />
            </div>
        </div>
        </div>
        <div className="chat-box" ref={chatBox}>
            
            {messages.map((key,index) => (
                <div key={index} className={key.user === decode.userId ? 'chat-msg right' :'chat-msg left'}>
                <div className="message">
                    <div className="image">
                        <img src="https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=80&q=80" alt="asd" />
                    </div>
                    <div className="info">
                        <div className='name'>
                            <span>Name</span>
                            <span>4:10 am</span>
                        </div>
                            <p className='msg-txt'>{key.message}</p>
                    </div>
                </div>
            </div>
            ))

            }
            {/* <div className='chat-msg right'>
                <div className="message">
                <div className="image">
                        <img src="https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=80&q=80" alt="asd" />
                    </div>
                    <div className="info">
                        <div className='name'>
                            <span>Name</span>
                            <span>4:10 am</span>
                        </div>
                            <p className='msg-txt'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro alias veniam minima quae id asperiores dicta repellat obcaecati tenetur aut?</p>
                    </div>
                   
                </div>
            </div> */}
        </div>
        <form className="chat-input" onSubmit={SendMsg} >
            <input onInput={InpMsg} type="text" placeholder='Type a Message'/>
            <div className='icons'>
            <i className="fa-regular fa-paper-plane"></i>
            </div>
        </form>
    </section>
    </>
  )
}

export default Chat