import React from 'react'

export const Login = () => {
  return (
    <div className='login'>
      <div className='form'>
        <p>Welcome Back</p>
        <h1>Login to your account</h1>
        <label>Email</label>
        <input type='email'></input>
        <label>Password</label>
        <input type='password'></input>
        <button>Login now</button>
      </div>
      <p>Dont have an account? <a href="/register">Join today</a></p>
    </div>
  )
}