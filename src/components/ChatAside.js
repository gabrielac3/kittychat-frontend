import React, { useState, useEffect, useRef }from 'react';
import axios from 'axios';

export const ChatAside = ({socket}) => {
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [userAdded, setUserAdded] = useState('');
  
  useEffect(() => {
    console.log('🟡: user from my room',users1)
  }, [users1]);
  useEffect(()=> {
    socket.on("user registered", isUserAdded => setUserAdded(isUserAdded))
    socket.on("newUserResponse", fetchDataUser);
    socket.on("usersInRoom", usersInRoom => setUsers1(usersInRoom));
  }, [socket])

  const fetchDataUser = async () => {
    try {
      const response = await axios.get('http://localhost:3100/users');
      setUsers(response.data);
      console.log(response.data.length)
    } catch (error) {
      console.error(error.message);
    }
  }    

  useEffect(() => {
    fetchDataUser();
    console.log('acaso soy un bucle?')
  }, [userAdded]);

   // const usersFromDB = users.map(user =>
  //   (<div className='user' key={user.uid}>     
  //     <p>{user.user_name}</p>
  //     <p>{user.status? 'En línea': 'Desconectado'}</p>
  //   </div>))

  return (
    <>
    <div className='users-title'>
      <i className="fa-solid fa-users"></i>
      <h3>Usuarios ({users.length})</h3>
    </div>
    <div className='users-cards'>
      { users1.current ? ( users1.current === 1 &&
        users.map(user =>
        <div className='user' key={user.uid}>
          <img src={user.avatar} alt='userImage'/>     
          <p>{user.user_name}</p>
          <p>{user.status? 'En línea': 'Desconectado'}</p>
        </div>)
        ) : (
          users.map(user =>
          <div className='user' key={user.uid}>
            <img src={user.avatar} alt='userImage'/>     
            <p>{user.user_name}</p>
            <p>{user.status? 'En línea': 'Desconectado'}</p>
          </div>
        )
      )}
      {users1[users1.current] && users1.current !== 1 &&
        users1[users1.current].map((user) =>
        <div className='user' key={user.uid}> 
          <p>{user.user_name}</p>
        </div>
      )}
      <p>{JSON.stringify(users1)}</p>
    </div>
  </>
  )
}
