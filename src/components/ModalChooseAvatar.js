import axios from 'axios';
import React from 'react'
const avatarProps = [
  {
    id: 'av1',
    src: 'https://i.imgur.com/91BcdRJ.jpg',
  },
  {
    id: 'av2',
    src: 'https://i.imgur.com/eHVDQJH.jpg',
  },
  {
    id: 'av3',
    src: 'https://i.imgur.com/uxTzXMr.jpg',
  },
  {
    id: 'av4',
    src: 'https://i.imgur.com/oXaamAE.jpg',
  },
  {
    id: 'av5',
    src: 'https://i.imgur.com/h18KKmo.jpg',
  },
  {
    id: 'av6',
    src: 'https://i.imgur.com/Qn7xOCc.jpg',
  },
  {
    id: 'av7',
    src: 'https://i.imgur.com/lY8Xxq3.jpg',
  },
  {
    id: 'av8',
    src: 'https://i.imgur.com/MbwR2UV.jpg',
  }
]

export const ModalChooseAvatar = ({
  toggleModal, userSession, setAvatar, setAvatarChange
}) => {
  async function changeAvatar(avatar) {
    console.log(avatar, 'avat')
    try {
      const response = await axios.post('http://localhost:3100/updateUserImg', {
        email: userSession.email,
        avatarSrc: avatar.src
      });
      // setAvatar(avatar.src)
      setAvatarChange(avatar.src)
      toggleModal('chooseAvatar')
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className='modal-shadow-bg'>
      <div className='modal m-join-to-channel'>
        <h3>Escoge tu avatar</h3>
        <div className='m-choose-avatars'>
          {avatarProps.map(avatar => 
            <div key={avatar.id} onClick={()=> changeAvatar(avatar)}>
              <img src={avatar.src}  alt='avatar'/>
            </div>
          )}
        </div>
        <div className='modal-btns flex'>
          <button>Confirmar</button>
          <button onClick={()=> toggleModal('chooseAvatar')}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
