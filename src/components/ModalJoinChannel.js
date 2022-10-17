import axios from 'axios';
import React from 'react'

export const ModalJoinChannel = ({ 
  setIsOpenJoinChannel, active, channelInfo, user
}) => {
  async function sendChannelName(channelInfo, user){
    setIsOpenJoinChannel(false)
    try {
      const response = await axios.post('http://localhost:3100/channelByName', {
        channelName: channelInfo.name_channel,
        uid: user.uid
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className={active ? "modal active" : "modal"}>
      <button>Unirme</button>
      {/* <button onClick={()=> sendChannelName(channelInfo, user)}>Cancelar</button> */}
    </div>
  )
}
