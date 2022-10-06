import React from 'react'

export const Home = () => {
  return (
    <div className='home'>
        <section className='profile-aside'>
          <div className='profile-logo'>
            <img src='../image/logo-home.png' alt='logo home'/>
          </div>
          <div className='profile'>
            <div>
              <img src='../image/user-img.png' alt='profile-img'/>
            </div>
            <p>Daphnne Reyes</p>
          </div>
          <button>Crear canal</button>
          <div className='channels-info'>
            <div className='channels-title'>
              <i class="fa-solid fa-cat"></i>
              <h2>Channels</h2>
            </div>
            <ul className='channels'>
              <li>Fans de JC</li>
              <li>ChatApp</li>
            </ul>
          </div>
        </section>

        <section className='main'>
          <div className='chat-navbar'>
            <div>
              <h3>ChatApp</h3>
              <p>Grupo para desarrollar...</p>
            </div>
            <div>
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>

          <div className='chat-main'>
            <p>mensaje prueba 1</p>
            <p>mensaje prueba 1</p>
            <p>mensaje prueba 1</p>
          </div>

          <form className='chat-message'>
            <input type='text' placeholder='Type your message'/>
            <button>
              <i class="fa-solid fa-paper-plane"></i>
            </button>
            {/* <img src='../image/send.png' alt='send icon'/> */}
          </form>
        </section>

        <section className='users-aside'>
          <div className='users-title'>
            <i class="fa-solid fa-users"></i>
            <h3>Users</h3>
          </div>
          <div className='users-cards'>
            <div className='user'>
              <h4>Paola Gamarra</h4>
              <p>Online</p>
            </div>
            <div className='user'>
              <h4>Gaby cordoba</h4>
              <p>Online</p>
            </div>
            <div className='user'>
              <h4>Daniela fuentes</h4>
              <p>Online</p>
            </div>
          </div>
        </section>
    </div>
  )
}
