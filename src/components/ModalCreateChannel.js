import React from 'react'

export const ModalCreateChannel = ({ toggleModal, setNewChannel }) => {
  const user = JSON.parse(sessionStorage.getItem('userName'))
  const addChannel = () => {
    return fetch('https://chatappservice.onrender.com/addChannel', {
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
    toggleModal(['createChannel']);
  }
  
  return (
    <div className='modal-shadow-bg'>
      <form className='modal m-create-channel flex'>
        <h3>Crear canal</h3>
        <input 
            type='text'
            name="nameChannel"
            value={formData.nameChannel}
            onChange={handleChange}
            placeholder = 'nombre del canal'
        ></input>
        <textarea 
            type='text'
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder = 'descripcion del canal'
        ></textarea>
        <div className='modal-btns flex'>
          <button type='submit' onClick={createChannel}>Crear canal</button>
          <button onClick={() => toggleModal(['createChannel'])}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
