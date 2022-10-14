import React, { useState, useEffect }from 'react';
import axios from 'axios';

export const ChatAside = ({socket}) => {
  const [users, setUsers] = useState([]);
  const [test, setTest] = useState([]);
  const [userAdded, setUserAdded] = useState('');
  useEffect(()=> {
    socket.on("user registered", isUserAdded => setUserAdded(isUserAdded))
    socket.on("newUserResponse", test => {
      setTest(test) //test = 'test' xa USER1
      console.log('im connected');
    })
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
    console.log('acaso soy un bucle?')
  }, [userAdded, test]);

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
