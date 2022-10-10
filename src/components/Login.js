import React from 'react'
import { Link } from "react-router-dom";

export const Login = () => {

  const getToken = () => {
    return fetch('http://localhost:3100/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    }).then(res => res.json()).then(data => data)
  }

  const [formData, setFormData] = React.useState(
    {email: "", password: ""}
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
    const token = await getToken();
    sessionStorage.setItem ('userinfo', JSON.stringify({ 'email':formData.email, 'token': token }));
  }

  return (
    <div className='login'>
      <form className='form' onSubmit={handleSubmit}>
        <p className='login-greeting'>Welcome Back</p>
        <h1 className='login-greeting'>Login to your account</h1>
        <label>Email</label>
        <input 
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          ></input>
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          ></input>
        <button type='submit'>Login now</button>
      </form>
      <p>Dont have an account?
        <Link to='/register' className='anchor'>Join today</Link>
      </p>

    </div>
  )
}