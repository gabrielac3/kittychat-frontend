import React from 'react'

export const ChatBody = ({messages}) => {
  const userName = sessionStorage.getItem('userName')
  return (
    <div className='chat-main'>

     { messages.map(message => 
      message.name === userName ? (
        <div className="user-chats flex" key={message.id}>
          <p className="sender-name">You</p>
          <span className="sender-msg msg-recipient">
            {message.text}
          </span>
        </div>
      ) : (
        <div className="user-chats flex" key={message.id}>
          <p className='receptor-name'>{message.name}</p>
          <span className="receptor-msg msg-recipient">
            {message.text}
          </span>
        </div>
      )
     )}
    </div>
  )
}
