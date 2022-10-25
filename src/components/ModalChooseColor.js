import React from 'react';
import axios from 'axios';

const colorProps = [
    {
      id: 'av1',
      src: 'https://www.pngitem.com/pimgs/m/518-5182033_streamlabs-chatbot-hd-png-download.png',
      color: "#646FD0"
    },
    {
      id: 'av2',
      src: 'https://img2.freepng.es/20180324/cue/kisspng-open-broadcaster-software-streaming-media-streamla-donate-5ab66113098343.960710561521901843039.jpg',
      color: "#245CAC"
    },
    {
      id: 'av3',
      src: 'https://img2.freepng.es/20180719/lpy/kisspng-streamlabs-mixer-streaming-media-open-broadcaster-avatar-discord-5b514c143c3f67.4769472415320545482468.jpg',
      color: "#549DCF"
    }
]

export const ModalChooseColor = (props) => {
    async function changeColor(avatar) {
        try {
          const response = await axios.post('http://localhost:3100/updateColor', {
            email: props.userSession.email,
            avatarColor: avatar.color
          });
          // setAvatar(avatar.src)
/*           setAvatarChange(avatar.src) */
          props.toggleModal('chooseColor')
        } catch (error) {
          console.error(error.message);
        }
      }

  return (
    <div className='modal-shadow-bg'>
      <div className='modal m-join-to-channel'>
        <h3>Escoge tu color</h3>
        <div className='m-choose-avatars flex'>
          {colorProps.map(avatar => 
            <div key={avatar.id} onClick={()=> changeColor(avatar)} data-color={avatar.color}>
              <p>Azul</p>
            </div>
          )}
        </div>
        <div className='modal-btns flex'>
          <button>Confirmar</button>
          <button onClick={()=> props.toggleModal('chooseColor')}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
