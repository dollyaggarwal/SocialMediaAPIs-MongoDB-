import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
import { friendSchema } from "../friends/friend.schema.js";

const UserModel = mongoose.model('users', userSchema);
const FriendModel = mongoose.model('friends', friendSchema);

export default class UserRepository{

    async signUp(name, emailID, hashedPassword, gender,avatar){
        try{
            const newUser = new UserModel({name, emailID,password:hashedPassword, gender,avatar,followers:[]}); 
            const result= await newUser.save();
            const newFriend = new FriendModel({user:result._id,request:[]});
            console.log(newFriend);
           await newFriend.save();
            await result.updateOne({_id:result._id, friends:newFriend._id});
            await result.save();
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

    async getDetails(id,userID){
        try{
            if(id== userID){
                return await UserModel.findOne({_id:userID}).select('-password');
            }
            else{
                return "Authorised user not found";
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500)
        }
    }
    async getAllDetails(){
        try{
            return await UserModel.find().select('-password');
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500)
        }
    }

    async updateDetails(id,userID,name,gender,avatar){
        try{
            if(id == userID){
                const user= await UserModel.findOne({_id:userID}).select('-emailID -password');
                if(user){
                    user.name = name;
                    user.gender = gender;
                    user.avatar = avatar;
                    return await user.save();
                }else{
                    return "User not found";
                }
            }
            else{
                return "User is not Authorised to update details";
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500)
        }
    }
}