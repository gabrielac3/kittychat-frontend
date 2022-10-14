import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ModalCreateChannel } from './ModalCreateChannel';

export const ProfileAside = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newChannel, setNewChannel] = useState('');
  const [channels, setChannels] = useState([]);
  // const [channelInfo, setChannelInfo] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('userName'))
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get('http://localhost:3100/channels');
        console.log(response.data);
        setChannels(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }    
    fetchDataUser();
  }, [newChannel]);
  useEffect(() => {
    console.log(channels);
  }, [channels])

  const getChannelInfo = async(channelName) => {
    try {
      const response = await axios.post('http://localhost:3100/channelByName', {
        channelName: channelName
      });
      console.log(response.data.message);
      props.setChannelInfo(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  }    
/*   const addUserToChannel = async() => {
    try {
      const response = await axios.post('http://localhost:3100/addUserChannel', {
        uid: user.uid,
        cid: 'Flintstone'
      });
      console.log(response.data);
      setChannels(response.data);
    } catch (error) {
      console.error(error.message);
    }
  } */    

  return (
    <>
      <div className="profile-logo">
        <img src="../image/logo-home.png" alt="logo home" />
      </div>
      <div className="profile">
        <div>
          <img src="../image/user-img.png" alt="profile-img" />
        </div>
        <p>ARREGLAR</p>
      </div>

      <button onClick={() => setIsOpen(true)}>Crear canal</button>
      {isOpen && <ModalCreateChannel setIsOpen={setIsOpen} setNewChannel={setNewChannel} />}

      <div className="channels-info">
        <div className="channels-title">
          <i className="fa-solid fa-cat"></i>
          <h2>Channels</h2>
        </div>
        <ul className="channels">
          { channels.map(channel => 
            <div>
              <li key={channel.cid}>{channel.name_channel}</li>
              <span onClick={() => getChannelInfo(channel.name_channel)}>+</span>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};
