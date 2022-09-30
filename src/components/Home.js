import React from 'react'

export const Home = () => {
  return (
    <div className='home'>
        <section>
          <div>
            <img src='../image/logo-home.png' alt='logo home'/>
          </div>
          <div className='profile'>
            <div>
              <img alt='profile-img'/>
            </div>
            <p>Daphnne Reyes</p>
          </div>
          <button>Crear canal</button>
          <div className='channels-title'>
            <i class="fa-solid fa-cat"></i>
            <h2>Channels</h2>
          </div>
          <div className='channels'>
            <ul>
              <li>Fans de JC</li>
              <li>ChatApp</li>
            </ul>
          </div>
        </section>

        <section>
          <div className='chat-navbar'>
            <div>
              <h3>ChatApp</h3>
              <p>Grupo para desarrollar...</p>
            </div>
            <div>
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>

          <div className='chat-main'></div>

          <div className='chat-message'>
            <input type='text'/>
            <img src='../image/send.png' alt='send icon'/>
          </div>
        </section>

        <section>
          {/* toggle */}
        </section>
    </div>
  )
}
