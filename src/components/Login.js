import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate();

  const getToken = () => {
    return fetch('https://chatappservice.onrender.com/login', {
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
/*         navigate('/home');  */ 
        return res.json();
      }
    })
    .catch(error => console.log(error))
  }

  const getUserRow = () => {
    return fetch('https://chatappservice.onrender.com/userRow',{
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
      // get Token
      const token = res.message;
      props.setUser(userRow.message.user_name);
      sessionStorage.setItem('userName', JSON.stringify({
        'email':formData.email, 
        'uid': userRow.message.uid,
        'user_name':userRow.message.user_name,
        'token': token,
        'image': userRow.message.avatar,
        'color': userRow.message.color
      }));

      props.socket.connect();

      props.socket.emit("newUser", {
        email: formData.email, 
        socketID: props.socket.id
      });
      setFormData({email: "", password: ""});
      navigate('/home'); 
    }else{
    showError(res)}
  }

  const showError = (res) => {
    const resMsg = res.message
    props.onErrorMsg(resMsg)
  }

  return (
    <div className='welcome-main'>
      <div className='mountain'>
        <img src='../image/mountain.jpg' alt='background' />
      </div>
      <div className='halfPurple'>
        <div className='logo-container'>
          <img src='../image/logoCat.png' className="img-logo" alt='logo-cat' />
        </div>
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
      </div>
      {
        props.errorMsg &&
        <div className='welcome-modal-error' ref={props.errorModal}>
          <p className='error'>{props.errorMsg}</p>
        </div>
      }
    </div>
  )
}