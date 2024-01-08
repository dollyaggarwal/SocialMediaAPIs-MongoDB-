import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
import { postSchema } from "../posts/post.schema.js";

const LikeModel = mongoose.model("likes", likeSchema);
const PostModel = mongoose.model("posts", postSchema);

export default class LikeRepository{

    async toggle(userID, postID){
        try {
            // Check if the post already has likes
            let likePost = await LikeModel.findOne({ postID: postID });
                // If the post already has likes, add the user ID to the array if not already present
                if (!likePost.userID.includes(userID)) {
                    likePost.userID.push(userID);
                    await likePost.save();
                    return "Post liked";
                } else {
                    likePost.userID = likePost.userID.filter((likeobj)=>likeobj!=userID);
                    await likePost.save();   
                    return "Post unliked";
                }
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }
    
    async get(postID){
        try{
        const likelength= await LikeModel.find({postID});
        return likelength[0].userID.length;
    }catch (err) {
        console.log(err.message);
        throw new ApplicationError('Something went wrong in the database', 500);
    }
 }
}