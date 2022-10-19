import './App.css';
import { Welcome } from './components/Welcome';
import {Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import io from 'socket.io-client';
import React, { useState } from 'react';

const socket = io("http://localhost:3300/");

function App() {
  
  const [user, setUser] = useState([]);

  socket.on('connect', () => {
    let user = JSON.parse(sessionStorage.getItem('userName'));
    if (user !== null){
      setUser(user.user_name);
      socket.emit("reconnect", {
        email: user.email,
        socketID: socket.id
      })
    }
  });

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
