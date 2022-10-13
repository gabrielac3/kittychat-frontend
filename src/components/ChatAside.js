import React, { useState, useEffect }from 'react';
import axios from 'axios';

export const ChatAside = ({socket}) => {
/*   const [allUsers, setAllUsers] = useState([]);
  const [usersOnline, setUsersOnline] = useState([]); */
  const [users, setUsers] = useState([]);

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
  }, []);

/*   useEffect(()=> {
      const fetchDataUser = async () => {
        try {
          const response = await axios.get('http://localhost:3100/users');
          const next=[];
          response.data.forEach(user=>{
            const findUser = usersOnline.find(aUser=> aUser.email === user.email)
            if(findUser){
              user.status = 'Online';
              next.push(user);
            }else{
              user.status = 'Disconnected';
              next.push(user);
            }
          })
          setAllUsers(next); */
  /*         socket.on("newUserResponse", data => {
            console.log('data',data);
            return setUsersOnline(data)}) */
/*         } catch (error) {
          console.error(error.message);
        }
      }
      socket.on("newUserResponse", data => {
        console.log('data',data);
        console.log(...allUsers);
        if(allUsers.length==0) {
          console.log('aqui 2');
          fetchDataUser();
        }else{
          data.forEach(user=>{
            const findUser = allUsers.find(aUser=> aUser.email === user.email)
            console.log('estamos aqui', findUser);
            if(findUser){
              let userIndex = allUsers.indexOf(findUser);
              findUser.status = 'Online';
              const next = [...allUsers];
              next[userIndex] = findUser;
              setAllUsers(next);
            }
          })
        }
      })
 }, [socket]) */

/*   useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get('http://localhost:3100/users');
        setAllUsers(response.data);
        console.log(response.data); */
/*         socket.on("newUserResponse", data => {
          console.log('data',data);
          return setUsersOnline(data)}) */
/*       } catch (error) {
        console.error(error.message);
      }
    }
    fetchDataUser();
  }, []); */

/*   useEffect(() => {
    usersOnline.forEach(user=>{
      const findUser = allUsers.find(aUser=> aUser.email === user.email)
      if(findUser){
        let userIndex = allUsers.indexOf(findUser);
        findUser.status = 'Online';
        const next = [...allUsers];
        next[userIndex] = findUser;
        setAllUsers(next);
      }
    }) */
/*     for(let i= 0; i<usersOnline.length; i++){
      for(let j= 0; j<allUsers.length; j++){
        if(usersOnline[i].email===allUsers[j].email){
          setAllUsersOnline(prev => {
            const next = [...prev]
            const singleUser = next[j]
            singleUser.status = 'Online'
            next[j]= singleUser
            return next
          })
        } else{
          setAllUsersOnline(prev => {
            const next = [...prev]
            const singleUser = next[j]
            singleUser.status = 'Disconnected'
            next[j]= singleUser
            return next
          })
        }
      }
    } */
/*     console.log(allUsers);
    console.log(usersOnline);
  }, [usersOnline]); */
  
/*   function compare(){
    for(let i= 0; i<usersOnline.length; i++){
      for(let j= 0; j<allUsers.length; j++){
        if(usersOnline[i].email===allUsers[j].email){
          setAllUsers(prev => {
            return{
            ...prev,
            status: 'Online'
            }
          }) */
/*           allUsers[j].status = 'Online'; */
/*         } else{
          setAllUsers(prev => {
            return{
            ...prev,
            status: 'Disconnected'
            }
          }) */
/*           allUsers[j].status = 'Disconnected'; */
/*         }
      }
    }
  } */

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
