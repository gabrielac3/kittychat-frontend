import React, { useState, useEffect }from 'react';
import axios from 'axios';

export const ChatAside = ({socket}) => {
  const [users, setUsers] = useState([]);
  const [usersOnline, setUsersOnline] = useState([]);

  useEffect(()=> {
    socket.on("newUserResponse", data => setUsersOnline(data))
}, [socket])

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get('http://localhost:3100/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchDataUser();
  }, []);

  function changeState(id) {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        return user.id === id ? { ...user, state: !user.state } : user;
      });
    });
  }

  return (
    <>
    <div className='users-title'>
      <i className="fa-solid fa-users"></i>
      <h3>Users</h3>
    </div>
    <p>{usersOnline}</p>
    <div className='users-cards'>
      {users.map((user) =>
        <div className='user' key={user.uid} onClick = {() => changeState(user.uid)}>     
          <p>{user.user_name}</p>      
        </div>
      )}
    </div>
  </>
  )
}
