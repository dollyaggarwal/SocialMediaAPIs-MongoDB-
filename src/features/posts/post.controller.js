import PostModel from "./post.model.js";
import PostRepository from "./post.repository.js";

export default  class PostController{

  constructor(){
    this.postRepository =  new PostRepository();
  }

    async getPostByUser(req, res){ 
      try{
        const userID = req.userID;
        const post = await this.postRepository.get(userID);
        if(!post){
         return res.status(404).send("Post do not found");
        }
        else{
          return res.status(200).send(post);
        }
      }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
    }

   async getAllPost(req,res){
    try{
        const posts = await this.postRepository.getAll();
        res.status(200).send(posts);
    }catch(err){
      console.log(err);
      res.status(500).send("Something went wrong");
  }
}

    async createPost(req, res){
      try{
        const {caption} = req.body;
        const userID = req.userID;
        const imageUrl= req.file.filename;
        const createdPost = await this.postRepository.create(userID,caption,imageUrl);
        return res.status(201).send(createdPost);
      }catch(err){
          console.log(err);
          res.status(500).send("Something went wrong");
      }
    }

   async updatePost(req,res){
    try{

      const postID = req.params.id;
      const userID = req.userID;
      const {caption} = req.body;  
      const imageUrl = req.file.filename;
      const post = {postID,userID,caption, imageUrl};
      const updatedPost= await this.postRepository.update(post);    
      res.status(200).send(updatedPost);
    }catch(err){
      console.log(err);
      res.status(500).send("Something went wrong");
   }
}

   async deletePost(req, res){
    try{
      const userID = req.userID;
      const postID = req.params.id;
      const result = await this.postRepository.delete(userID, postID);
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
      res.status(500).send("Something went wrong");
   }
}
}