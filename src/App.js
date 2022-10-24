import './App.css';
import { Welcome } from './components/Welcome';
import {Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';

const socket = io("http://localhost:3300/");

function App() {
  
  const [user, setUser] = useState('');

  socket.on('connect', () => {
    let userData = JSON.parse(sessionStorage.getItem('userName'));
    console.log('me connecto ahora')
    if (userData !== null){
      setUser(userData);
      socket.emit("reconnect", {
        email: userData.email,
        socketID: socket.id
      })
    }
  });

  useEffect(()=>{
    console.log(user)
  }, [user])

  return (
      <div className='app'>
        <Routes>
          <Route path='/*' element = {<Welcome socket = {socket} setUser = {setUser}/>}></Route>
          <Route path='/home' element = {<Home socket = {socket} user = {user}/>}></Route>
        </Routes>
      </div>
  );
}

export default App;
