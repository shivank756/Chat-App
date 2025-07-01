// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedUser} from '../Redux/userSlice';

// export default function OtherUser(props) {
//   const user = props.user;
//   if (!user) return null;
//   const dispatch = useDispatch();
//   const {selectedUser,onlineUsers} = useSelector(store=>store.user);
//   //const isOnline = onlineUsers.includes(user._id);
//   const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);


//   const selectedUserHandler = (user) =>{
//     console.log(user);
//     dispatch(setSelectedUser(user));
//   }
    
  
  
//   const isSelected = selectedUser?._id === user?._id;
//   return (
    
//     <div>
//       <div onClick={() => selectedUserHandler (user)} className={`
//           flex items-center gap-4 cursor-pointer px-3 py-2 rounded-md
//           ${isSelected ? 'bg-[#475569]' : 'hover:bg-[#475569]'}
//           transition duration-200
//         `}>
//         <div className={`avatar ${isOnline ? 'avatar-online' :' '}`}>
//           <div id='chat' className=' w-12 h-12 rounded-full overflow-hidden'>
//             <img src={user?.ProfilePhoto} alt="user avatar" />
//           </div>
//         </div>

//         <div className=' '>
//           <div className='justify-items-center '>
//             <p>{user?.FullName}</p>
//           </div>
//         </div>

//       </div>
//       <div className='divider my-0 py-0 h-1'></div>
//     </div>
//   )
// }


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../Redux/userSlice';
import { setMessages } from '../Redux/messageSlice';
import axios from 'axios';

export default function OtherUser(props) {
  const user = props.user;
  if (!user) return null;

  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store => store.user);
  const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);

  const selectedUserHandler = async (user) => {
    try {
      dispatch(setSelectedUser(user)); // for immediate visual update
        dispatch(setMessages([]));
      axios.defaults.withCredentials = true;

      const res = await axios.get(
        `https://chat-app-backend-rsmz.onrender.com/api/v1/message/${user._id}`
      );

      dispatch(setMessages(res.data.data)); // ✅ immediately update messages

    } catch (err) {
      console.error("❌ Failed to load messages:", err);
    }
  };

  const isSelected = selectedUser?._id === user?._id;

  return (
    <div>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`
          flex items-center gap-4 cursor-pointer px-3 py-2 rounded-md
          ${isSelected ? 'bg-[#475569]' : 'hover:bg-[#475569]'}
          transition duration-200
        `}
      >
        <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
          <div id='chat' className='w-12 h-12 rounded-full overflow-hidden'>
            <img src={user?.ProfilePhoto} alt="user avatar" />
          </div>
        </div>

        <div>
          <p>{user?.FullName}</p>
        </div>
      </div>
      <div className='divider my-0 py-0 h-1'></div>
    </div>
  );
}

