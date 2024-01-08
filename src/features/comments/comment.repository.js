import mongoose from "mongoose";
import {commentSchema} from "./comment.schema.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";

const CommentModel = mongoose.model("comments", commentSchema);

export default class CommentRepository{

    async add(postID, userID, comment){
     try{
        const commentPost = await CommentModel.findOne({ postID: postID });
        let user, userindx;
        commentPost.comments.forEach((val,ind)=>{
      if(val.userID == userID){
        user = true;
        userindx= ind;
      }
     });
       if(!user){
        commentPost.comments.push({comment:comment, userID:userID});
        await commentPost.save();
        return commentPost;
       }else{
        commentPost.comments[userindx].comment = comment; 
        await commentPost.save();
        return commentPost;

       }
    }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }

    async get(postID){
      try{
      return await CommentModel.findOne({postID})
 
      }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }

    async delete(postID, userID){
      try{
        const postComment = await CommentModel.findOne({postID});
        
        postComment.comments= postComment.comments.filter((commentObj)=>commentObj.userID.toString() != userID
        );
        postComment.save();
      }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong in the database', 500);
        }
    }

}