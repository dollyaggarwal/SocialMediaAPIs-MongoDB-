
//1. Import express
import express from "express";
import {UserController} from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js"
import {upload} from "../../middlewares/fileupload.middleware.js"


//2. Initialise Express router
const userRouter = express.Router();

const userController = new UserController();

//localhost/api/users

userRouter.post('/signup',upload.single('avatar'),(req, res, next)=>{
    userController.signUp(req,res,next)});
userRouter.post('/signin',(req, res)=>{userController.signIn(req,res)});
userRouter.get('/signout',(req, res)=>{userController.signout(req,res)});
userRouter.put('/resetPassword',jwtAuth,(req, res)=>{
    userController.resetPassword(req,res)});
userRouter.get('/getUser/:id',jwtAuth,(req, res)=>{userController.getDetailsByUser(req,res)});
userRouter.get('/getAll/',jwtAuth,(req, res)=>{userController.getAllUserDetails(req,res)});
userRouter.put('/update/:id',jwtAuth,upload.single('avatar'),(req, res)=>{userController.updateUserDetails(req,res)});

export default userRouter;
