import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
          <img src='../image/logoCat.png' className="img-logo" alt='logo-cat' />
        </div>
        <Routes>
          <Route path='/' element = {<Login />}></Route>
          <Route path='/login' element = {<Login />}></Route>
          <Route path='/register' element = {<Register />}></Route>
        </Routes>
      </div>
    </div>
  )
}
