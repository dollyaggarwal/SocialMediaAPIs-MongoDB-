import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;
console.log(url)
export const connectUsingMongoose =  async() =>{
    try{
    await mongoose.connect(url, {
            dbName:"SocialMedia"     
    });
    console.log("Mongodb connected using mongoose");
}catch(err){
    console.log("Error while connecting to db")
}
}
