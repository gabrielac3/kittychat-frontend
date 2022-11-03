import React from 'react'

export const ChatBody = ({ messages, channelInfo, color }) => {
  const userName = JSON.parse(sessionStorage.getItem('userName'));

  return (
    <div className='chat-main'>

      {messages.map(message =>
        message.room.name_channel === channelInfo.name_channel && (
          message.name === userName.user_name ? (
            <div className="user-chats flex" key={message.id}>
              <p className={`sender-name p-${color.slice(1)}`}>You</p>
              <span className={`sender-msg msg-recipient c-${color.slice(1)}`}>
                {message.text}
              </span>
            </div>
          ) : (
            <div className="user-chats flex" key={message.id}>
              <p className={`p-${color.slice(1)}`}>{message.name}</p>
              <span className={`receptor-msg msg-recipient c-${color.slice(1)}`}>
                {message.text}
              </span>
            </div>
          )
        ))}
    </div>
  )
}
