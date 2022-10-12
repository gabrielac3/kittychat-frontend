import React, { useState, useEffect }from 'react';
import axios from 'axios';

export const ChatAside = ({socket}) => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(()=> {
    socket.on("newUserResponse", data => setStatus(data))
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

  return (
    <>
    <div className='users-title'>
      <i className="fa-solid fa-users"></i>
      <h3>Users</h3>
    </div>
    <p>{status}</p>
    <div className='users-cards'>
      {users.map((user, index) =>
        <div className='user' key={index}>     
          <p>{user.user_name}</p>      
        </div>
      )}
    </div>
  </>
  )
}
