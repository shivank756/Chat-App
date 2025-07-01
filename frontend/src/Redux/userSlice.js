import {createSlice} from "@reduxjs/toolkit"
import otherUser from "../components/OtherUser";
import { act } from "react";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authUser : null,
        otherUsers :null,
        selectedUser:null,
        onlineUsers:[],
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUser:(state,action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        resetUserState:(state,action)=>{
            
            state.authUser = null;
            state.otherUsers = null;
            state.selectedUser = null;
            state.onlineUsers = [];
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        }

        
    }

    
}
)
export const {setAuthUser,setOtherUser,setSelectedUser,resetUserState,setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;
