import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
   
    caption:String,
    imageUrl:String,
   userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
   }, 
   likeID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'likes'
    },
    commentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comments'
    }, 
})