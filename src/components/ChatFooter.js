import React, { useState } from 'react';
import InputEmoji from "react-input-emoji";

export const ChatFooter = ({ socket, channelInfo }) => {
  const [message, setMessage] = useState('')
  const [text, setText] = useState("");
  
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
  function handleOnEnter(text) {
    console.log("enter", text);
  }


  return (
    <form className='chat-message' onSubmit={handleSendMessage}>
      <InputEmoji
      type='text' 
      value={message}
      onChange={setMessage}
      placeholder="Type your message"
      onEnter={handleSendMessage}
      
    />
      <button>
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </form>
  )
}
