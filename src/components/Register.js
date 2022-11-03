import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = (props) => {
  const navigate = useNavigate();

  const addUser = () => {
    return fetch("https://chatappservice.onrender.com/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) return res.json()
        else {
          navigate('/login');
          props.socket.emit("user registered", true);
          return res.json();
        }
      })
      .catch(error => console.log(error))
  }

  const [formData, setFormData] = React.useState({
    nameUser: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await addUser();
    showError(res);
  }

  const showError = (res) => {
    const resMsg = res.message;
    const indexOfEqual = resMsg.indexOf("=");
    if (indexOfEqual === undefined || indexOfEqual === -1) return;
    const msgError = resMsg.slice(0, indexOfEqual);
    if (msgError === "Key (user_name)") {
      props.onErrorMsg("Username already in use");
    } else if (msgError === "Key (email)") {
      props.onErrorMsg("Email already in use");
    } else props.onErrorMsg("else");
  };

  const enabled =
    formData.email.length > 0 &&
    formData.nameUser.length > 0 &&
    formData.password.length > 0

  return (
    <div className='welcome-main'>
      <div className='mountain'>
        <img src='../image/mountain.jpg' alt='background' />
      </div>
      <div className='halfPurple'>
        <div className='logo-container'>
          <img src='../image/logoCat.png' className="img-logo" alt='logo-cat' />
        </div>
        <form className='register' onSubmit={handleSubmit}>
          <div className='form'>
            <p>Welcome</p>
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
            <button type='submit' disabled={!enabled}>Sign Up</button>
          </div>
          <p>Already have an account?
            <Link to="/login" className='anchor'>Sign in</Link>
          </p>
        </form>
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
