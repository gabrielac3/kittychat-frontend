import React from 'react';
import axios from 'axios';
const colorProps = [
  {
    id: 'color1',
    src: 'https://www.pngitem.com/pimgs/m/518-5182033_streamlabs-chatbot-hd-png-download.png',
    hexName: "#646FD0"
  },
  {
    id: 'color2',
    src: 'https://img2.freepng.es/20180324/cue/kisspng-open-broadcaster-software-streaming-media-streamla-donate-5ab66113098343.960710561521901843039.jpg',
    hexName: "#245CAC"
  },
  {
    id: 'color3',
    src: 'https://img2.freepng.es/20180719/lpy/kisspng-streamlabs-mixer-streaming-media-open-broadcaster-avatar-discord-5b514c143c3f67.4769472415320545482468.jpg',
    hexName: "#549DCF"
  }
]
export const ModalChooseColor = (props) => {
  async function changeColor(color) {
    try {
      const response = await axios.post('http://localhost:3100/updateColor', {
        email: props.userSession.email,
        avatarColor: color.hexName
      });
      props.setColor(color.hexName)
      props.toggleModal(['chooseColor'])
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className='modal-shadow-bg m-choose-color'>
      <div className='modal m-join-to-channel'>
        <h3>Escoge tu color</h3>
        <span className='close-x' onClick={() => props.toggleModal(['chooseColor'])}>
          <i class="fa-solid fa-xmark"></i>
        </span>
        <div className='m-choose-colors flex'>
          {colorProps.map(color =>
            <div
              key={color.id}
              className={`c-${color.hexName.slice(1)}`}
              onClick={() => changeColor(color)}>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}






