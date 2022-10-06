import React, { useState } from 'react'

export const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('')

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', {
      text: message,
      name: 'user tester',
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
    setMessage('');
    console.log('handling send msm');
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
