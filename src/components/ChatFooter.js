import React, { useState } from 'react'

export const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('')
  
  function getUserName() {
    const user = sessionStorage.getItem('userName')
    const email = JSON.parse(user).email
    console.log(email);
    return fetch('http://localhost:3100/userName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
      .then(res => {
        console.log(res);
        if(!res.ok) return res.json()
        else return res.json();
      })
      .catch(error => console.log(error))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const name = await getUserName()
    if(message.trim() && sessionStorage.getItem('userName')) {
      getUserName()
      socket.emit('chat message', {
        text: message,
        name: name.message,
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
