import React from 'react'

export const ChatBody = ({messages}) => {
  return (
    <div className='chat-main'>
     {messages.map(message => {
        <p>{message.text}</p>
     })}
        <p>mensaje prueba 1</p>
        <p>mensaje prueba 1</p>
    </div>
  )
}
