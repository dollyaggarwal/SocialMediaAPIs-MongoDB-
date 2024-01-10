import mongoose from "mongoose";
import { friendSchema } from "./friend.schema.js";
import {userSchema} from "../user/user.schema.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";

const FriendModel = mongoose.model('friends', friendSchema);
const UserModel = mongoose.model('users',userSchema);

export default class FriendRepository{

    async sendRequest(userID,id){
        try{
            const userRequest = await FriendModel.findOne({user:userID});
            if(userRequest){
                 userRequest.requests.push(id);
                await userRequest.save();
                return 'Request sent';
            }else{
                return 'user not found';
            }
        }catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }

    async acceptRequest(id,userID){
        try{
            const userRequest = await UserModel.findOne({_id:id});
            const user = await UserModel.findOne({_id:userID});
           
            if(userRequest){
                if(user){
                    if(userRequest.followers.includes(userID)){
                        return "request already accepted";
                    }else{
                        userRequest.followers.push(userID);
                        const accepted = await userRequest.save();
                        const removeFromPendingRequest = await FriendModel.findOne({_id:accepted.friends._id});
                        removeFromPendingRequest.requests = removeFromPendingRequest.requests.filter((frnd)=> frnd._id != userID);
                        await removeFromPendingRequest.save();
                    }
                    if(!user.followers.includes(id)){
                        user.followers.push(id);
                        await user.save();  
                    }
                       
                        return "Friend Request Accepted";
                }else{
                    return "User not found";
                }
            }
            else{
                return "Internal Server Error";
            }
        }catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }

    async rejectRequest(id,userID){
        try{
            const userRequest = await UserModel.findOne({_id:id});
            const user = await UserModel.findOne({_id:userID});
          
            if(userRequest){
                if(user){
                    const removeFromPendingRequest = await FriendModel.findOne({_id:userRequest.friends._id});
                    removeFromPendingRequest.requests = removeFromPendingRequest.requests.filter((frnd)=> frnd._id != userID);
                    await removeFromPendingRequest.save();
                   
                    return "Friend Request Rejected";
                }else{
                    return "User not found";
                }
            }
            else{
                return "Internal Server Error";
            }
        }catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }

    async unfollow(id,userID){
        try{
            const userRequest = await UserModel.findOne({_id:id});
            const user = await UserModel.findOne({_id:userID});
           
            if(userRequest){
                if(user){
                  const totalFollowers = userRequest.followers.length;
                  userRequest.followers = userRequest.followers.filter((follower)=> follower._id != userID);
                 await userRequest.save();
                 if(totalFollowers-1 == userRequest.followers){
                    return "Friend Unfollow";
                 }
                }else{
                    return "User not found";
                }
            }
            else{
                return "Internal Server Error";
            }
        }catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }
}