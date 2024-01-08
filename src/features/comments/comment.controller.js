import CommentModel from "./comment.model.js";
import CommentRepository from "./comment.repository.js";

export class CommentController{

    constructor(){
        this.commentRepository = new CommentRepository();
    }

    async addComment(req, res){
        try{
            const postID = req.params.id;  
            const {comment} = req.body;
            const userID = req.userID;
            const postedComment= await this.commentRepository.add(postID,userID,comment);
            res.status(201).send(postedComment);
        } catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
          }
    }

    async getComment(req, res){  
        try{     
    const postID = req.params.id;
    const  result = await this.commentRepository.get(postID);
    res.status(200).send(result);
    }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
         }
    }
   async deleteComment(req, res){
    try{
        const postID = req.params.id;
        const userID = req.userID;
      await this.commentRepository.delete(postID, userID);
        return res.status(200).send('Comment is deleted successfully');
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
     }
}
}