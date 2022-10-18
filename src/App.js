import './App.css';
import { Welcome } from './components/Welcome';
import {Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import io from 'socket.io-client';

const socket = io("http://localhost:3300/");

socket.on('connect', () => {
  let user = JSON.parse(sessionStorage.getItem('userName'));
  if (user !== null){
    console.log(user, socket.id)
    socket.emit("reconnect", {
      email: user.email,
      socketID: socket.id
    })
  }
});

function App() {
  return (
      <div className='app'>
        <Routes>
          <Route path='/*' element = {<Welcome socket = {socket} />}></Route>
          <Route path='/home' element = {<Home socket = {socket} />}></Route>
        </Routes>
      </div>
  );
}

export default App;
