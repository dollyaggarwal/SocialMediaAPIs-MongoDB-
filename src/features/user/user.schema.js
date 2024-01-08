import mongoose from "mongoose";

export const userSchema =  new mongoose.Schema({
    name:{type:String, maxLength:[25, "Name can't be greater than 25 charcaters"]},
    emailID:{type:String, unique:true, required:true,
            match:[/.+\@.+\../, "Please enter a valid email"]
        },
        password:{
            type:String,
        },
})
