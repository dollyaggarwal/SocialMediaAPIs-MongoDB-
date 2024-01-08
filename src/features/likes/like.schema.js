import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({

   userID:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
   }],
   postID:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'posts'
   }
});