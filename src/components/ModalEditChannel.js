import React from 'react';
import axios from 'axios';

export const ModalEditChannel = (props) => {
    const user = JSON.parse(sessionStorage.getItem('userName'))

    const getChannelInfo = async(channel) => {
        try {
          const response = await axios.post('http://localhost:3100/channelByName', {
            channelName: channel.name_channel
          });
          return response.data.message;
/*           props.setChannelInfo(response.data.message); */
        } catch (error) {
          console.error(error.message);
        }
      }  

    async function changeChannel(e) {
        e.preventDefault();
        const dataChannel = await getChannelInfo(props.channelInfo);
        try {
            const response = await axios.post('http://localhost:3100/updateChannel', {
            cid: dataChannel.cid,
            newNameChannel: formData.nameChannel,
            newDescription: formData.description,
            });
            props.setChannelInfo({...props.channelInfo, name_channel:formData.nameChannel, description:formData.description });
        } catch (error) {
            console.error(error.message);
        }
        props.toggleModal(['editChannel', 'channelOptions']);
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

  return (
    <div className='modal-shadow-bg'>
    <form className='modal m-create-channel flex'>
      <h3>Editar canal</h3>
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
        <button type='submit' onClick={(e) => changeChannel(e)}>Editar canal</button>
        <button onClick={() => props.toggleModal(['editChannel', 'channelOptions'])}>Cancelar</button>
      </div>
    </form>
  </div>
  )
}
