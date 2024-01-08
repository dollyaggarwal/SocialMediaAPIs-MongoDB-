import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";

const UserModel = mongoose.model('users', userSchema);

export default class UserRepository{

    async signUp(name, emailID, hashedPassword){
        try{
            const newUser = new UserModel({name, emailID,password:hashedPassword});
           const result= await newUser.save();
            return result;
        } catch(err){
            console.log(err.message);
            throw new ApplicationError('Something went wrong in database', 500);
        }
    }
     
    async signIn(emailID, password){
        try{
            return await UserModel.findOne({emailID, password});
        }
        catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong in database', 500);
        }
    }

    async findByEmail(emailID){
        try{     
            //find the document
           return await UserModel.findOne({emailID});
          
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong in database', 500);
        }    
    }

    async resetPassword(userID, hashedPassword){
        try{
            let user = await UserModel.findById(userID);
            if(user){
                user.password = hashedPassword;
                user.save();
            }else{
                throw new Error("No such user found");
            }
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500)
        }
    }
}