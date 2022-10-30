import React from 'react';
import axios from 'axios';

export const ModalDeleteChannel = (props) => {

    async function deleteChannel(e) {
/*         e.preventDefault(); */
        console.log(props.channelInfo)
        try {
            const response = await axios.post('http://localhost:3100/deleteChannel', {
            cid: props.channelInfo.cid,
            });
        } catch (error) {
            console.error(error.message);
        }
        props.setChannelInfo({});
        props.toggleModal(['deleteChannel','channelOptions']);
        }


  return (
    <form className='modal-shadow-bg'>
      <div className='modal m-join-to-channel'>
        <h3>¿Deseas eliminar este canal?</h3>
        <div className='modal-btns flex'>
          <button type= 'submit' onClick={(e) => deleteChannel(e)}>Eliminar</button>
          <button onClick={()=> props.toggleModal(['deleteChannel','channelOptions'])}>Cancelar</button>
        </div>
      </div>
    </form>
  )
}
