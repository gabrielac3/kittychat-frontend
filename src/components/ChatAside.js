import React, { useState, useEffect, useRef }from 'react';
import axios from 'axios';

export const ChatAside = ({socket}) => {
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [userAdded, setUserAdded] = useState('');
  const count = useRef([]);
  // const [inputValue, setInputValue] = useState("");
  // const previousInputValue = useRef("");

  // useEffect(() => {
  //   previousInputValue.current = inputValue;
  // }, [inputValue]);
  useEffect(() => {
    count.current = users1
    console.log(count.current)
    console.log(users1)
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
      {count.current &&
      count.current.map((user) =>
        <div className='user' key={user.uid}> 
          <p>{user.user_name}</p>
        </div>
      )}
      <p>{userAdded} aqui hay algo?</p>
    </div>
  </>
  )
}
