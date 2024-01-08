import { ApplicationError } from "../../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class PostModel{

    constructor(userID, caption, imageUrl,postID) { 
        this.userID = userID;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this.postID = postID;  
     
    }

    static get(postID){
        const post = posts.find((i)=> i.postID == postID);
        return post;
    }

    static getByUser(userID){
        const post = posts.find((i)=> i.userID == userID);
        return post;
    }

    static getAll(){
        return posts;
    }

    static create(post){
        post.postID = posts.length+1;
        posts.push(post);
        return post;
    }

    static update(postID,userID,caption,imageUrl){
        const post = this.get(postID);
        if(!post){
            throw new ApplicationError('Post not found to update', 404)
        }
        const postObj = {postID,userID,caption,imageUrl};
        const index = posts.findIndex((p) => p.postID == postObj.postID);    
        posts[index] = postObj;
    }

    static filter(caption){
        const result = posts.filter((post)=>{
            return(!caption || post.caption == caption);
        });
        return result;
    }

    static delete(userID, postID){
      
        const postIndex = posts.findIndex(
            (i) => i.postID == postID && i.userID == userID   
        );
        if(postIndex == -1)
        throw new ApplicationError('Post not found', 404)
        else
        posts.splice(postIndex, 1);
    }
}

let posts = [
    new PostModel(1,1,'Christmas coding challenge', 
    'https://missionencodeable.com/static/media/christmas_header_4.2c832a5427045d590813b1e27da9d0ea.svg'),

    new PostModel(2,1,'New Year Live coding eve',
     'https://i.ytimg.com/vi/jsco7Zv14x8/maxresdefault.jpg'),

    new PostModel(3,2,'New Year coding eve',
     'https://i.ytimg.com/vi/jsco7Zv14x8/maxresdefault.jpg'),
];
