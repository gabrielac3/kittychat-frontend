import React from 'react'
import { Login } from './Login'
import { Register } from './Register'

export const Welcome = () => {
  return (
    <div className='welcome-main'>
      <div className='mountain'>
        <img src='../image/mountain.jpg' alt='background' />
      </div>
      <div className='halfPurple'>
        <div className='logo-container'>
          <img src='../image/logoCat.png' class="img-logo" alt='logo-cat' />
        </div>
        {/* <Login></Login> */}
        <Register></Register>
      </div>
    </div>
  )
}
