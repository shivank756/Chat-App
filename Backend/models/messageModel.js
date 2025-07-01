import mongoose from "mongoose";
const message=new mongoose.Schema({
    SenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
    },
    ReceiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, 
    messages:{
        type:String,
        required:true
        
    }
},{timestamps:true})
export const Message=mongoose.model("Message",message);
