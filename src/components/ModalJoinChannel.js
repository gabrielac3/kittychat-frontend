import axios from 'axios';
import React, { useEffect } from 'react'

export const ModalJoinChannel = ({ 
  setIsOpenJoinChannel, channelInfo, user, socket
}) => {
  async function sendChannelName(channelInfo, user){
    try {
      await axios.post('http://localhost:3100/addUserToChannel', {
        cid: channelInfo.cid,
        uid: user.uid
      });
    } catch (error) {
      console.error(error.message);
    }
    socket.emit("joinChannel", channelInfo)
    setIsOpenJoinChannel(prev => !prev)
  }
  return (
    <div className='modal-join-to-channel'>
      <p>Deseas unirte a este canal?</p>
      <div className='flex'>
        <button onClick={()=> sendChannelName(channelInfo, user)}>Unirme</button>
        <button onClick={()=> setIsOpenJoinChannel(prev => !prev)}>Cancelar</button>
      </div>
    </div>
  )
}
