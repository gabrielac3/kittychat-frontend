import React, { useState } from 'react'

export const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('')

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(message.trim() && sessionStorage.getItem('userName')) {
      socket.emit('chat message', {
        text: message,
        name: sessionStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
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
