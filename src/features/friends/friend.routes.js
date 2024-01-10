import express from 'express';
import FriendController from './friend.controller.js';

const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.post('/sendrequest/:id', (req,res) =>{friendController.sendFriendRequest(req,res)});
friendRouter.post('/acceptrequest/:id', (req,res) =>{friendController.acceptFriendRequest(req,res)});
friendRouter.post('/rejectrequest/:id', (req,res) =>{friendController.rejectFriendRequest(req,res)});
friendRouter.post('/unfollow/:id', (req,res) =>{friendController.unfollowFriend(req,res)});

export default friendRouter;