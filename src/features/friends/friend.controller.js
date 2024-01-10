
import FriendRepository from "./friend.repository.js";

export default class FriendController{

    constructor(){
        this.friendRepository = new FriendRepository();
    }

    async sendFriendRequest(req, res){
        try{
        const userID = req.params.id;
        const  id= req.userID;
        const requestSent = await this.friendRepository.sendRequest(userID,id);
        return res.status(200).send(requestSent);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }

    async acceptFriendRequest(req, res){
        try{
            const userID = req.params.id;
            const id = req.userID;
            const requestAccepted = await this.friendRepository.acceptRequest(id,userID);
            return res.status(200).send(requestAccepted);

        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }
    async rejectFriendRequest(req, res){
        try{
            const userID = req.params.id;
            const id = req.userID;
            const requestRejected = await this.friendRepository.rejectRequest(id,userID);
            return res.status(200).send(requestRejected);

        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }

    
    async unfollowFriend(req, res){
        try{
            const userID = req.params.id;
            const id = req.userID;
            const requestAccepted = await this.friendRepository.unfollow(id,userID);
            return res.status(200).send(requestAccepted);

        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }
}