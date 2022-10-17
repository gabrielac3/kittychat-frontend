import React from 'react'

export const ModalCreateChannel = ({ setIsOpen, setNewChannel }) => {
  const user = JSON.parse(sessionStorage.getItem('userName'))
  const addChannel = () => {
    return fetch('http://localhost:3100/addChannel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        nameChannel: formData.nameChannel,
        description: formData.description,
        uid: formData.uid,
        token: user.token
      })
    })
    .then(res => {
      if(!res.ok) return res.json()
      else { 
        return res.json();
      }
    })
    .catch(error => console.log(error))
  }
  
  const [formData, setFormData] = React.useState(
    {nameChannel: "", description: "", uid: "" }
  )
  
  function handleChange(event) {
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [event.target.name]: event.target.value,
            uid: user.uid
        }
    })
  }

  async function createChannel(event) {
    event.preventDefault();
    if(user.token){
      await addChannel();
      setNewChannel(formData.nameChannel)
    } 
    else console.log('user unidentified');
    setIsOpen(false);
  }
  
  return (
    <form>
      <input 
          type='text'
          name="nameChannel"
          value={formData.nameChannel}
          onChange={handleChange}
      ></input>
      <input 
          type='text'
          name="description"
          value={formData.description}
          onChange={handleChange}
      ></input>
      <button type='submit' onClick={createChannel}>Crear canal</button>
      <button onClick={() => setIsOpen(false)}>Cancelar</button>
    </form>
  )
}
