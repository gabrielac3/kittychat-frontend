import './App.css';
import { Welcome } from './components/Welcome';
import {Routes, Route } from "react-router-dom";
import { Home } from './components/Home';

function App() {
  return (
      <div className='app'>
        <Routes>
          <Route path='/*' element = {<Welcome/>}></Route>
          <Route path='/home' element = {<Home/>}></Route>
        </Routes>
      </div>
  );
}

export default App;
