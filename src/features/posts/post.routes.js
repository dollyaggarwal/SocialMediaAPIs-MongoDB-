import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';


const postRouter = express.Router();
const postController = new PostController();

postRouter.get('/userpost',(req,res)=>{
    postController.getPostByUser(req, res)});
postRouter.get('/:id',postController.getPost);
postRouter.get('/',(req,res)=>{
    postController.getAllPost(req, res)});
postRouter.post('/create',upload.single('imageUrl'),(req,res)=>{
    postController.createPost(req, res)});
postRouter.post('/filter',postController.filterPost);
postRouter.delete('/delete/:id',(req,res)=>
{postController.deletePost(req, res)});
postRouter.put('/update/:id',upload.single('imageUrl'), (req,res)=>{
    postController.updatePost(req, res)});

export default postRouter;