// import {createSlice} from '@reduxjs/toolkit';

// const messageSlice = createSlice({
//     name: 'message',
//     initialState: {
//     messages: [],
//     },
//     reducers:{
//         setMessages : (state,action)=>{
//             state.messages = action.payload;
//         },
//         addMessage:(state,action)=>{
//             state.messages.push(action.payload);
//         },
//         clearMessages: (state) => {
//             state.messages = [];
//         },

//     }
// });
// export const {setMessages,addMessage,clearMessages} = messageSlice.actions;
// export default messageSlice.reducer;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../Redux/messageSlice";
import { setUnreadMessage } from "../Redux/userSlice"; // if using unread count

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const senderId = newMessage?.SenderId || newMessage?.from;

      if (selectedUser?._id === senderId) {
        dispatch(addMessage(newMessage)); // ✅ only add if it's for selected user
      } else {
        // ✅ optional: mark as unread
        dispatch(setUnreadMessage({ fromUserId: senderId }));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser, dispatch]);
};

export default useGetRealTimeMessage;

