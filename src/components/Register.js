import React from 'react'
import { Link } from "react-router-dom";

export const Register= () => {
  const [errorMessage, setErrorMessage] = React.useState('default')
  const [errorMsg, setErrorMsg] = React.useState('')
  const logFetch = () => {
    fetch('http://localhost:3100/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      if(!res.ok) {
        return res.text().then(text => { throw text })
       }
      else {
       return res.json();
      }
    })
    .catch(error => {
      const errorMsg = JSON.parse(error).error
      const equalPos = errorMsg.indexOf('=') 
      setErrorMessage(errorMsg.slice(0, equalPos)) 
    })
  }

  const [formData, setFormData] = React.useState(
    {nameUser: "", email: "", password: ""}
  )

  function handleChange(event) {
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [event.target.name]: event.target.value
        }
    })
  }

  function handleSubmit (e) {
    e.preventDefault();
    logFetch();
    showError()
    console.log(showError())
  }

  function showError() {
    if(errorMessage == 'Key (user_name)'){
      console.log('q pasa');
      setErrorMsg('Username already in use')
    } else if (errorMessage == 'Key (email)'){
      setErrorMsg('Email already in user')
    } else console.log('dime ahora');
  }

  return (
    <form className='register' onSubmit={handleSubmit}>
        <div className='form'>
            <p>Welcome</p>
            <p>{errorMessage}</p>
            <p>{errorMsg}</p>
            <h1>Register your account</h1>
            <label>User</label>
            <input
             type='text'
             name="nameUser"
             value={formData.nameUser}
             onChange={handleChange}
            ></input>

            <label>Email</label>
            <input 
              type='email'
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>

            <label>Password</label>
            <input 
              type='password'
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
            <button type='submit' >Sign Up</button>
        </div>
        <p>Already have an account?
          <Link to="/login">Sign in</Link>
        </p>
    </form>  
  )
}