import React, { useState, useEffect, useRef } from 'react'
import { ChatAside } from './ChatAside'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'
import { ProfileAside } from './ProfileAside'

export const Home = ({ socket, user }) => {
  const [messages, setMessages] = useState([])
  const [avatarChange, setAvatarChange] = useState('')
  const [channelInfo, setChannelInfo] = useState({ name_channel:'Canal General',
  description:'Canal General' });

  const userSession = JSON.parse(sessionStorage.getItem('userName'));
  //modals
  const [isOpen, setIsOpen] = useState({
    joinChannel: false,
    createChannel: false,
    chooseAvatar: false,
    channelOptions: false
  });

  const toggleModal = modal => {
    setIsOpen({...isOpen, [modal]: !isOpen[modal]})
  }

  useEffect(()=> {
    socket.on("chat message", msgInfo => setMessages([...messages, msgInfo]))
    socket.on("general room", msgInfo => setMessages([...messages, msgInfo]))
  }, [socket, messages])
  useEffect(()=> {
    console.log('messages body', messages);
  }, [messages])

console.log(user,  userSession.uid === channelInfo.uid)
console.log(user, userSession)
  return (
    <div className='home'>
        <section className='profile-aside'>
          <ProfileAside 
            setChannelInfo = {setChannelInfo} socket={socket} user={user}
            setAvatarChange = {setAvatarChange} avatarChange = {avatarChange}
            toggleModal = {toggleModal} isOpen = { isOpen }
          />
        </section>

        <section className='main'>
          <div className='chat-navbar'>
            <div>
            <h3>{channelInfo ? channelInfo.name_channel : 'general Channel'}</h3>
              <p>{channelInfo ? channelInfo.description : 'Grupo para desarrollar...'}</p>
            </div>
            { userSession.uid === channelInfo.uid &&
            <div>
              <i className="fa-solid fa-ellipsis-vertical" onClick={()=> toggleModal('channelOptions')}></i>
              {isOpen.channelOptions && <div>
                <p>Editar</p>
                <p>Eliminar</p>
              </div>}
            </div>}
          </div>

          <ChatBody messages={messages} channelInfo = {channelInfo}/>

          <ChatFooter socket={socket} channelInfo = {channelInfo} />
        </section>

        <section className='users-aside'>
          <ChatAside socket={socket} avatarChange = {avatarChange}/>
        </section>
    </div>
  )
}
