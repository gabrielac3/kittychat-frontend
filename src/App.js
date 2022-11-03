import './App.css';
import {Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import io from 'socket.io-client';
import React, { useEffect, useRef, useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';

const socket = io("https://chatappservice.onrender.com/");

function App() {
  
  const [user, setUser] = useState('');

  socket.on('connect', () => {
    let userData = JSON.parse(sessionStorage.getItem('userName'));
    if (userData !== null){
      setUser(userData);
      socket.emit("reconnect", {
        email: userData.email,
        socketID: socket.id
      })
    }
  });

  const [errorMsg, setErrorMsg] = React.useState('')
  const errorModal = useRef();
  if(errorMsg) {
    setTimeout(() => {
      errorModal.current.classList.add('hide-modal')
    }, 3000);
  }

  useEffect(()=>{
  }, [user])

  return (
      <div className='app'>
        <Routes>
          <Route path='/' element = {<Login 
            onErrorMsg = { str => setErrorMsg(str)} socket={socket} 
          setUser={setUser} errorMsg = {errorMsg} errorModal={errorModal}/>}></Route>
          <Route path='/login' element = {<Login 
            onErrorMsg = { str => setErrorMsg(str)} socket={socket} 
          setUser={setUser} errorMsg = {errorMsg} errorModal={errorModal}/>}></Route>
          <Route path='/register' element = {<Register 
            onErrorMsg = { str => setErrorMsg(str)} 
          socket={socket} errorMsg = {errorMsg} errorModal={errorModal}/>}></Route>
          <Route path='/home' element = {<Home socket = {socket} user = {user}/>}></Route>
        </Routes>
      </div>
  );
}

export default App;
