import { ApplicationError } from "../../../error-handler/applicationError.js";
import PostModel from "../posts/post.model.js";
import UserModel from "../user/user.model.js";

export default class CommentModel{

    constructor(postID, comment, id){
        this.postID = postID;
        this.comment = comment;
        this.id = id;
    }
    static add(postID,comment){

        const commentPost= PostModel.getAll().find(
            (i) => i.postID == postID
        );
        if(!commentPost){
         throw new ApplicationError('Post not found', 404)
            }
            else{
      const postComment = new CommentModel( postID,comment);
        postComment.id = comments.length+1;
        comments.push(postComment);
        return postComment;
        }
    }

    static get(postID){
        return comments.filter((i) => i.postID == postID);
    }

    static getById(id){
        return comments.filter((i) => i.id == id);
    }

    static delete(id){
        const commentIndex = comments.findIndex(
            (i) => i.id == id  
        );   
        if(commentIndex == -1)
       throw new ApplicationError('Comment not found', 404)
        else
        comments.splice(commentIndex, 1);
    }

   static update(comment,id){
        const commentObj = {comment,id};
        const index = comments.findIndex((c) => c.id == commentObj.id); 
        comments[index] = commentObj;   
    }
}

let comments = [
    new CommentModel(1,'good pic',1),
    new CommentModel(2,'elegant person',2),
    new CommentModel(1,'Very useful coding challenge', 3),
    new CommentModel(3,'its very challenging to win', 4),
]