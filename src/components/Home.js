import React, { useState, useEffect } from 'react'
import { ChatAside } from './ChatAside'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'
import { ProfileAside } from './ProfileAside'

export const Home = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [channelInfo, setChannelInfo] = useState([]);
  useEffect(()=> {
    socket.on("chat message", msgInfo => setMessages([...messages, msgInfo]))
  }, [socket, messages])
  useEffect(()=> {
    console.log(channelInfo);
  }, [channelInfo])
/* -----------TESTING SOCKETS---------- */

  return (
    <div className='home'>
        <section className='profile-aside'>
          <ProfileAside setChannelInfo = {setChannelInfo} ></ProfileAside>
        </section>

        <section className='main'>
          <div className='chat-navbar'>
            <div>
            <h3>{channelInfo ? channelInfo.name_channel : 'general Channel'}</h3>
              <p>{channelInfo ? channelInfo.description : 'Grupo para desarrollar...'}</p>
            </div>
            <div>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>

          <ChatBody messages={messages}/>

          <ChatFooter socket={socket} />
        </section>

        <section className='users-aside'>
          <ChatAside socket={socket}/>
        </section>
    </div>
  )
}
