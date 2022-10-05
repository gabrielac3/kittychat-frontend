import React from 'react'
import { Link } from "react-router-dom";

export const Register= () => {
  const logFetch = () => {
    fetch('https://enigmatic-inlet-02267.herokuapp.com/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameUser: 'Daphnne Reyes',
        email: 'email@gmail.com',
        status: '123456'
      })
    }).then(res => res.json()).then(data => console.log(data))
  }
  return (
    <div className='register'>
        <div className='form'>
            <p>Welcome</p>
            <h1>Register your account</h1>
            <label>User</label>
            <input type='text'></input>
            <label>Email</label>
            <input type='email'></input>
            <label>Password</label>
            <input type='password'></input>
            <button onClick={logFetch} >Sign Up</button>
        </div>
        <p>Already have an account?
          <Link to="/login">Sign in</Link>
        </p>
    </div>   
  )
}