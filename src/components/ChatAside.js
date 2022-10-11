import React, { useEffect, useState } from 'react'

export const ChatAside = () => {
  const [users, setUsers]= useState([{
    name: 'te pasas'
  }])

  useEffect(()=>{
    console.log('no cambiare a axios');
    const getUsers = async () => {
      try {
        const res = await fetch('http://localhost:3100/users');
        console.log(res);
        setUsers(res);
      } catch (error) {
        console.error(error.message);
      }
    }
    getUsers();
  },[])
  /* let users
  function getUsers() {
    return fetch('http://localhost:3100/users')
      .then(res => {
        if(!res.ok) return res.json()
        else return res.json();
      })
      .catch(error => console.log(error))
  }
  users = await getUsers()
  console.log(users); */
  return (
    <div>
      <div className='users-title'>
        <i className="fa-solid fa-users"></i>
        <h3>Users</h3>
        <p>{users}</p>
      </div>
      <div className='users-cards'>
  {/*       { users.map(user => 
          <div className='user' key={user.uid}>
            <h4>{user.user_name}</h4>
            <p>Online</p>
          </div>
        )} */}
        {/* <div className='user'>
          <h4>Gaby Córdova</h4>
          <p>Online</p>
        </div>
        <div className='user'>
          <h4>Daniela fuentes</h4>
          <p>Online</p>
        </div> */}
        <button>click me</button>
      </div> 
    </div>
  )
}

/* let users
  function getUsers() {
    return fetch('http://localhost:3100/users')
      .then(res => {
        if(!res.ok) return res.json()
        else return res.json();
      })
      .catch(error => console.log(error))
  }
  users = await getUsers()
  console.log(users); */