import LikeModel from "./like.model.js";
import LikeRepository from "./like.repository.js";

export default class LikeController{
    constructor(){
       this.likeRepository = new LikeRepository();
    }

    async getLikes(req, res){
        try{
        const postID = req.params.id;
        const likes =await this.likeRepository.get(postID);
         return res.status(200).send(likes.toString());
        } 
        catch(err){
          console.log(err);
          res.status(500).send("Something went wrong");
        }  
    }

    async toggleLikes(req,res){
        try{
        const userID = req.userID;
        const postID = req.params.id;
        const result =await this.likeRepository.toggle(userID, postID);    
          return res.status(200).send(result);
       } 
      catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
      }     
}
}