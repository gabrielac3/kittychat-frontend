import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ModalCreateChannel } from './ModalCreateChannel';
import { ModalJoinChannel } from './ModalJoinChannel';
import { useNavigate } from "react-router-dom";
import { ModalChooseAvatar } from './ModalChooseAvatar';
import { ModalChooseColor } from './ModalChooseColor';

export const ProfileAside = (props) => {
  console.log(props.user)
  const navigate = useNavigate();
  const [joinChannelData, setJoinChannelData] = useState(false);

  //channels
  const [newChannel, setNewChannel] = useState('');
  const [channels, setChannels] = useState([]);
  const userSession = JSON.parse(sessionStorage.getItem('userName'));

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get('http://localhost:3100/channels');
        setChannels(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }    
    fetchDataUser();
  }, [newChannel, props.channelInfo]);

  const getChannelInfo = async(channel) => {
    props.toggleModal(['joinChannel'])
    setJoinChannelData(channel)
    try {
      const response = await axios.post('http://localhost:3100/channelByName', {
        channelName: channel.name_channel
      });
      console.log(response.data.message);
      props.setChannelInfo(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  }      

  // const joinChannel = (event) => {
  //   props.socket.emit("joinChannel", event.target.textContent)
  // }

  const logOut = () => {
    props.socket.emit('logOut');
    console.log('cerrar sesión');
    navigate('/login');
    sessionStorage.clear();
  }

  return (
    <>
      <div className="profile-logo">
        <img src="../image/logo-home.png" alt="logo home" />
      </div>
      <div className="profile">
        <div>
          <img src={props.avatarChange ?
            props.avatarChange : (userSession.image || props.user.image)
          } alt="profile-img" />
          <span onClick={() => props.toggleModal(['chooseAvatar'])}>+</span>
          <span onClick={() => props.toggleModal(['chooseColor'])}>Colors</span>
        </div>
        <p>{typeof(props.user) === 'string' ? 
          userSession.user_name: props.user.user_name}
        </p>
      </div>
      {props.isOpen.chooseAvatar && 
      <ModalChooseAvatar 
        toggleModal={props.toggleModal}
        userSession = { userSession } 
        setAvatarChange = {props.setAvatarChange}
        avatarChange = {props.avatarChange}
      />}

      {props.isOpen.chooseColor && 
      <ModalChooseColor
        toggleModal={props.toggleModal}
        userSession = { userSession } 
        setAvatarChange = {props.setAvatarChange}
        avatarChange = {props.avatarChange}
      />}

      <button onClick={() => props.toggleModal(['createChannel'])} className='cursor-btn'>Crear canal</button>
      {props.isOpen.createChannel && 
      <ModalCreateChannel 
        toggleModal={props.toggleModal} 
        setNewChannel={setNewChannel} 
      />}

      <div className="channels-info flex">
        <div className="channels-title">
          <i className="fa-solid fa-cat"></i>
          <h2>Channels</h2>
        </div>

        {props.isOpen.joinChannel && 
        <ModalJoinChannel 
          toggleModal={ props.toggleModal }
          channelInfo = { joinChannelData }
          currentChannel = { props.channelInfo }
          userSession = { userSession }
          socket = { props.socket }
        />}
        <ul className="channels">
          { channels.map((channel) => 
            <div className='aside-profile--channel flex' key={channel.key}>
              <span onClick={() => getChannelInfo(channel)} className='cursor-btn'>
                <i className="fa-solid fa-user-plus"></i>
              </span>
              <li>{channel.name_channel}</li>
            </div>
          )}
        </ul>
      </div>
      <div onClick={logOut} className='logOut'>
        <i className="fa-solid fa-arrow-right-from-bracket cursor-btn"></i>
        <p>Cerrar sesión</p>
      </div>
    </>
  );
};
