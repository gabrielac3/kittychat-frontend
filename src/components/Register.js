import React from 'react'
import { Link } from "react-router-dom";

export const Register= () => {
  // const [errorMessage, setErrorMessage] = React.useState('default')
  const [resMsg, setErrorMsg] = React.useState('')
  let msgError

  const addUser = () => {
    return fetch('http://localhost:3100/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      if(!res.ok) return res.json()
      else return res.text();
    })
    .catch(error => console.log(error))
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

  async function handleSubmit (e) {
    e.preventDefault();
    const res = await addUser();
    showError(res)
  }

  const showError = (res) => {
    const resMsg = res.message
    const indexOfEqual = resMsg.indexOf('=') 
    if(!indexOfEqual) return
    const msgError = resMsg.slice(0, indexOfEqual)
    if(msgError === 'Key (user_name)'){
      setErrorMsg('Username already in use')
    } else if (msgError === 'Key (email)'){
      setErrorMsg('Email already in use')
    } else setErrorMsg('else')
  }

  return (
    <form className='register' onSubmit={handleSubmit}>
        <div className='form'>
            <p>Welcome</p>
            <p>{resMsg}</p>
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