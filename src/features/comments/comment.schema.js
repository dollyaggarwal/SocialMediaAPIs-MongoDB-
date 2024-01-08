import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    comments:[
        {
            comment:String,
            userID:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
         
        }
    ],
     postID:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'posts'
       }
});