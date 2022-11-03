import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";

export const Welcome = ({ socket, setUser }) => {
  const [errorMsg, setErrorMsg] = React.useState('')
  if (errorMsg) {
    setTimeout(() => {
      document.querySelector('.welcome-modal-error').classList.add('hide-modal')
      console.log('hide');
    }, 3000);
  }
  return (
    <div className="welcome-main">
      <div className="mountain">
        <img src="../image/mountain.jpg" alt="background" />
      </div>
      <div className="halfPurple">
        <div className="logo-container">
          <img src="../image/logoCat.png" className="img-logo" alt="logo-cat" />
        </div>
        <Routes>
          <Route path='/' element={<Login onErrorMsg={str => setErrorMsg(str)} socket={socket} setUser={setUser} />}></Route>
          <Route path='/login' element={<Login onErrorMsg={str => setErrorMsg(str)} socket={socket} setUser={setUser} />}></Route>
          <Route path='/register' element={<Register onErrorMsg={str => setErrorMsg(str)} socket={socket} />}></Route>
        </Routes>
      </div>
      {
        errorMsg &&
        <div className='welcome-modal-error'>
          <p className='error'>{errorMsg}</p>
        </div>
      }
    </div>
  );
};
