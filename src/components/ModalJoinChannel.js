import axios from 'axios';
import React, { useEffect } from 'react'

export const ModalJoinChannel = ({ 
  toggleModal, channelInfo, userSession, socket, currentChannel, setChannelInfo
}) => {
  async function sendChannelName(channelInfo, userSession){
    try {
      await axios.post('http://localhost:3100/addUserToChannel', {
        cid: channelInfo.cid,
        uid: userSession.uid
      });
    } catch (error) {
      console.error(error.message);
    }
    console.log('both: current, next', currentChannel, channelInfo);
    
    socket.emit("joinChannel", {
      channelInfo,
      userSession
    })
    
    socket.emit("leaveChannel", {
      currentChannel,
      userSession
    })
    toggleModal('joinChannel')
    setChannelInfo(channelInfo);
  }
  return (
    <div className='modal-shadow-bg'>
      <div className='modal m-join-to-channel'>
        <h3>¿Deseas unirte a este canal?</h3>
        <div className='modal-btns flex'>
          <button onClick={()=> sendChannelName(channelInfo, userSession)}>Unirme</button>
          <button onClick={()=> toggleModal('joinChannel')}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
