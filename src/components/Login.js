import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate();

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
    })
    .then(res => {
      if(!res.ok) return res.json()
      else {
        navigate('/home');  
        return res.json();
      }
    })
    .catch(error => console.log(error))
  }

  const getUserRow = () => {
    return fetch('http://localhost:3100/userRow',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData.email })
    }
    )
    .then(res => {
      if(!res.ok) return res.json()
      else return res.json();
    })
    .catch(error => console.log(error))
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
    const res = await getToken();
    if(!res.message.includes(' ')){
      // get userRow
      const userRow = await getUserRow()
      console.log('login', userRow);
      // get Token
      const token = res.message
      sessionStorage.setItem('userName', JSON.stringify({
        'email':formData.email, 
        'uid': userRow.message.uid,
        'user_name':userRow.message.user_name,
        'token': token 
      }));

      props.socket.emit("newUser", {
        email: formData.email, 
        socketID: props.socket.id
      });
      setFormData({email: "", password: ""});
      navigate('/home'); 
    }
    showError(res)
  }

  const showError = (res) => {
    const resMsg = res.message
    props.onErrorMsg(resMsg)
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