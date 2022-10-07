import React, { useState, useEffect } from 'react'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'

export const Home = ({ socket }) => {
  const [messages, setMessages] = useState([])
  useEffect(()=> {
    socket.on("chat message", data => setMessages([...messages, data]))
  }, [socket, messages])
/* -----------TESTING SOCKETS---------- */

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
          <button>Crear canal</button>
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
          <div className='users-title'>
            <i className="fa-solid fa-users"></i>
            <h3>Users</h3>
          </div>
          <div className='users-cards'>
            <div className='user'>
              <h4>Paola Gamarra</h4>
              <p>Online</p>
            </div>
            <div className='user'>
              <h4>Gaby cordoba</h4>
              <p>Online</p>
            </div>
            <div className='user'>
              <h4>Daniela fuentes</h4>
              <p>Online</p>
            </div>
          </div>
        </section>
    </div>
  )
}
