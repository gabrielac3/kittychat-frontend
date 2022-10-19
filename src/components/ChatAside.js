import React, { useState, useEffect }from 'react';
import axios from 'axios';

export const ChatAside = ({socket}) => {
  const [users, setUsers] = useState([]);
  const [userAdded, setUserAdded] = useState('');
  useEffect(()=> {
    socket.on("user registered", isUserAdded => setUserAdded(isUserAdded))
    socket.on("newUserResponse", fetchDataUser);
  }, [socket])

  const fetchDataUser = async () => {
    try {
      const response = await axios.get('http://localhost:3100/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }    

  useEffect(() => {
      fetchDataUser();
    console.log('acaso soy un bucle?')
  }, [userAdded]);

  return (
    <>
    <div className='users-title'>
      <i className="fa-solid fa-users"></i>
      <h3>Users</h3>
    </div>
{/*     <p>{status}</p> */}
    <div className='users-cards'>
      {users.map((user, index) =>
        <div className='user' key={index}>     
          <p>{user.user_name}</p>
          <p>{user.status? 'online': 'desconectado'}</p>     
        </div>
      )}
    </div>
  </>
  )
}
