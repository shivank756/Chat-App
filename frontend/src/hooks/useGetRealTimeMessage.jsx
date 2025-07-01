import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../Redux/messageSlice";
import { setUnreadMessage } from "../Redux/userSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { selectedUser } = useSelector((store) => store.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      //dispatch(addMessage(newMessage));
      // add new code here
      const senderId = newMessage.SenderId;

      
      if (selectedUser && selectedUser._id === senderId) {
        dispatch(addMessage(newMessage));
      } else {
        // Optional: Set unread message indicator for others
        dispatch(setUnreadMessage({ fromUserId: senderId }));
      }
    };

    socket.on("newMessage", handleNewMessage);

    // ✅ Clean up to avoid duplicate listeners
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch,selectedUser]);
};

export default useGetRealTimeMessage;
