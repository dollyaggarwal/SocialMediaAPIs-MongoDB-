    import { ApplicationError } from "../../../error-handler/applicationError.js";
    import PostModel from "../posts/post.model.js";
    import UserModel from "../user/user.model.js";
    import CommentModel from "../comments/comment.model.js";

    export default class LikeModel{

        constructor(postID, userLikes){
            this.postID = postID;
            this.userLikes = userLikes;
        }

        static get(postID){
            const post = PostModel.get(postID);
            if(!post){
                throw new ApplicationError('Post not found',404);
            }
        const postLikes= likes.filter((l) => l.postID == postID);
        const totalLikes = postLikes.map((like) => like.userLikes.length);
        return {totalLikes};
        }


        static toggle(userID, postID){
            //validate user and product
            const user = UserModel.getAll().find(
                (u) => u.id == userID
            );
            if(!user)
            throw new ApplicationError('User not found',404);
                
            const post = PostModel.get(postID);
            if(!post)
            throw new ApplicationError('Post not found',400);

            const postLikes= likes.filter((l) => l.postID == postID);
            const userLikesArray = postLikes.map((like) => like.userLikes);
            const index = userLikesArray[0].findIndex( (i)=>i == userID);
            if(index == -1)
            {
                 userLikesArray[0].push(userID);
                 const totalLikes = userLikesArray[0].length;
                 return {totalLikes,toggle:'Like'};
            }
            else{
             userLikesArray[0].splice(index,1);
             const totalLikes = userLikesArray[0].length;
            return {totalLikes,toggle:'UnLike'};
            }
             
        }
    }
    
    let likes = [
        new LikeModel(1,[1,3,4]),
        new LikeModel(2,[1,2,4]),
        new LikeModel(3, [2,3,1,4]),
    ];
    