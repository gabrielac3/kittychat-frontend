import React, { useState, useEffect } from 'react'
import { ChatAside } from './ChatAside'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'
import { ProfileAside } from './ProfileAside'

export const Home = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [channelInfo, setChannelInfo] = useState({ name_channel:'Canal General',
  description:'Canal General' });
  useEffect(()=> {
    socket.on("chat message", msgInfo => setMessages([...messages, msgInfo]))
  }, [socket, messages])
  useEffect(()=> {
    console.log('messages body', messages);
  }, [messages])
/* -----------TESTING SOCKETS---------- */

  return (
    <div className='home'>
        <section className='profile-aside'>
          <ProfileAside setChannelInfo = {setChannelInfo} socket={socket} />
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

          <ChatBody messages={messages} channelInfo = {channelInfo}/>

          <ChatFooter socket={socket} channelInfo = {channelInfo} />
        </section>

        <section className='users-aside'>
          <ChatAside socket={socket}/>
        </section>
    </div>
  )
}
