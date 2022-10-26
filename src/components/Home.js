import React, { useState, useEffect, useRef } from 'react'
import { ChatAside } from './ChatAside'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'
import { ModalDeleteChannel } from './ModalDeleteChannel'
import { ModalEditChannel } from './ModalEditChannel'
import { ProfileAside } from './ProfileAside'

export const Home = ({ socket, user }) => {
  const [messages, setMessages] = useState([])
  const [avatarChange, setAvatarChange] = useState('')
  const [channelInfo, setChannelInfo] = useState({ name_channel:'Canal General',
  description:'Canal General' });
  const [color, setColor] = useState('#CB7BB7')
  const userSession = JSON.parse(sessionStorage.getItem('userName'));

  //modals
  const [isOpen, setIsOpen] = useState({
    joinChannel: false,
    createChannel: false,
    chooseAvatar: false,
    channelOptions: false,
    editChannel: false,
    deleteChannel: false,
    chooseColor: false
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

  const showHideModal = (modal) => {
    toggleModal(modal);
    toggleModal('channelOptions');
  }

console.log(user,  userSession.uid === channelInfo.uid)
console.log(user, userSession)
  return (
    <div className='home'>
        <section className='profile-aside'>
          <ProfileAside 
            setChannelInfo = {setChannelInfo} socket={socket} user={user}
            setAvatarChange = {setAvatarChange} avatarChange = {avatarChange}
            toggleModal = {toggleModal} isOpen = { isOpen }
            channelInfo = {channelInfo} setColor = {setColor}
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
                <p onClick={()=> toggleModal('editChannel')}>Editar</p>
                {isOpen.editChannel && 
                <ModalEditChannel 
                  toggleModal={toggleModal} 
                  setChannelInfo = {setChannelInfo}
                  channelInfo = {channelInfo}
                />}

                <p onClick={()=> toggleModal('deleteChannel')}>Eliminar</p>
                {isOpen.deleteChannel && 
                <ModalDeleteChannel
                  toggleModal={toggleModal} 
                  setChannelInfo = {setChannelInfo}
                  channelInfo = {channelInfo}
                />}
              </div>}
            </div>}
          </div>

          <ChatBody messages={messages} channelInfo = {channelInfo} color = {color}/>

          <ChatFooter socket={socket} channelInfo = {channelInfo} />
        </section>

        <section className='users-aside'>
          <ChatAside socket={socket} avatarChange = {avatarChange}/>
        </section>
    </div>
  )
}
