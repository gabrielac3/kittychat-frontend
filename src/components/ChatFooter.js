import React, { useState } from 'react'

export const ChatFooter = ({ socket, channelInfo }) => {
  const [message, setMessage] = useState('')
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('userName'))
    console.log(channelInfo.name_channel);
    if(message.trim() && sessionStorage.getItem('userName')) {
      if(channelInfo.name_channel==='Canal General'){
        socket.emit('general room', {
          text: message,
          name: user.user_name,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
          room: channelInfo
        });

      }else{
        socket.emit('chat message', {
          text: message,
          name: user.user_name,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
          room: channelInfo
        });
    }
    }
    setMessage('');
  }

  return (
    <form className='chat-message' onSubmit={handleSendMessage}>
      <input 
        type='text' 
        placeholder='Type your message'
        value={message}
        onChange = { e => setMessage(e.target.value)}
      />
      <button>
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </form>
  )
}
