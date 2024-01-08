import express from 'express';
import { CommentController } from './comment.controller.js';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post('/addcomment/:id',(res, req)=>{ commentController.addComment(res, req)});
commentRouter.get('/:id',(res, req)=>{commentController.getComment(res, req)});
commentRouter.delete('/delete/:id',(res, req)=>{commentController.deleteComment(res, req)});

export default commentRouter;