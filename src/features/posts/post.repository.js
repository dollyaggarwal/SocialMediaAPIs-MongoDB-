import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
import { likeSchema } from "../likes/like.schema.js";
import {commentSchema} from "../comments/comment.schema.js";

const PostModel = mongoose.model("posts",postSchema);
const LikeModel = mongoose.model("likes",likeSchema);
const CommentModel = mongoose.model("comments", commentSchema);
export default class PostRepository{            
   
    async create(userID,caption,imageUrl){
        try{
            const newPost = new PostModel({userID:new ObjectId(userID),caption,imageUrl});
            let savedPost = await newPost.save();
           const likePost = await LikeModel.create({ postID: savedPost._id, userID: [] });
            await likePost.save();
            const commentPost = await CommentModel.create({postID:savedPost._id, comments:[]});
            await commentPost.save();
            console.log(commentPost);
           await savedPost.updateOne({_id:savedPost._id, likeID:likePost._id, commentID:commentPost._id});
            await savedPost.save();
            return savedPost;
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }

    async get(userID){
        try{
           return await PostModel.findOne({userID:new ObjectId(userID)});
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }
    async getAll(userID){
        try{
           return await PostModel.find();
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }
        async update(post) {
            try {
               const userPost = await PostModel.findOne({_id:post.postID,userID: post.userID});
               if(userPost)
               {
                userPost.caption = post.caption;
                userPost.imageUrl = post.imageUrl;
                    return await userPost.save();
            } else {
                return "Post not found";
            }
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }

    async delete(userID,postID){
        try {
            console.log(userID)
            const post = await PostModel.findOne({_id:postID, userID:userID});
            if(!post){
                return "Post of user not found to delete";
            }
            else{
                const likePost = await LikeModel.deleteOne({postID:post._id});
                const commentPost = await CommentModel.deleteOne({postID:post._id});

                if(!likePost || !commentPost){
                    return "post not found";
                }
                else{
                    await PostModel.deleteOne({_id:postID});  
                    return "Post is removed"
                }
            }
    }catch (err) {
        console.log(err);
        throw new ApplicationError('Something went wrong in the database', 500);
    }
}
    
}
