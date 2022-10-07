import React from 'react'
import { Link } from "react-router-dom";

export const Register= () => {
  const logFetch = () => {
    fetch('https://enigmatic-inlet-02267.herokuapp.com/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => res.json()).then(data => console.log(data))
  }

  const [formData, setFormData] = React.useState(
    {username: "", email: "", password: ""}
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
    sessionStorage.setItem('userName', formData.username)
  }

  return (
    <form className='register' onSubmit={handleSubmit}>
        <div className='form'>
            <p>Welcome</p>
            <h1>Register your account</h1>
            <label>User</label>
            <input
             type='text'
             name="username"
             value={formData.username}
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