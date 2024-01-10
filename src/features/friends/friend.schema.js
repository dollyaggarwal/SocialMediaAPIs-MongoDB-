import mongoose from "mongoose";

export const friendSchema = new mongoose.Schema({
 user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    
    requests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ]
})