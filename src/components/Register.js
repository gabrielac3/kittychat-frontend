import React from 'react'
import { Link } from "react-router-dom";

export const Register= () => {
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
            <button>Sign Up</button>
        </div>
        <p>Already have an account?
          <Link to="/login">Sign in</Link>
        </p>
    </div>   
  )
}