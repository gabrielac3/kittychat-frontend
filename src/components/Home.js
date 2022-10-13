import React, { useState, useEffect } from 'react'
import { ChatAside } from './ChatAside'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'

export const Home = ({ socket }) => {
  const [messages, setMessages] = useState([])
  useEffect(()=> {
    socket.on("chat message", msgInfo => setMessages([...messages, msgInfo]))
  }, [socket, messages])
/* -----------TESTING SOCKETS---------- */

const addChannel = () => {
  return fetch('http://localhost:3100/addChannel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(res => {
    if(!res.ok) return res.json()
    else { 
      return res.json();
    }
  })
  .catch(error => console.log(error))
}

const [formData, setFormData] = React.useState(
  {nameChannel: "", description: "", uid: "" }
)

function handleChange(event) {
  setFormData(prevFormData => {
      return {
          ...prevFormData,
          [event.target.name]: event.target.value
      }
  })
}

  return (
    <div className='home'>
        <section className='profile-aside'>
          <div className='profile-logo'>
            <img src='../image/logo-home.png' alt='logo home'/>
          </div>
          <div className='profile'>
            <div>
              <img src='../image/user-img.png' alt='profile-img'/>
            </div>
            <p>Daphnne Reyes</p>
          </div>
          <button onClick={addChannel}>Crear canal</button>
          <input 
              type='text'
              name="nameChannel"
              value={formData.nameChannel}
              onChange={handleChange}
          ></input>
          <input 
              type='text'
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></input>
           <div className='channels-info'>
            <div className='channels-title'>
              <i className="fa-solid fa-cat"></i>
              <h2>Channels</h2>
            </div>
            <ul className='channels'>
              <li>Fans de JC</li>
              <li>ChatApp</li>
            </ul>
          </div>
        </section>

        <section className='main'>
          <div className='chat-navbar'>
            <div>
              <h3>ChatApp</h3>
              <p>Grupo para desarrollar...</p>
            </div>
            <div>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>

          <ChatBody messages={messages} />

          <ChatFooter socket={socket} />
        </section>

        <section className='users-aside'>
          <ChatAside socket={socket} />
        </section>
    </div>
  )
}
