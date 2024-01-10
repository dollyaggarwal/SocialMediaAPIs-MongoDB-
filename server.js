import express from 'express';
import swagger, {serve} from 'swagger-ui-express';

import apiDocs from './swagger.json' assert {type: 'json'};
import { type } from 'os';
import { connectUsingMongoose } from './config/mongooseconfig.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import { ApplicationError } from './error-handler/applicationError.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/posts/post.routes.js';
import commentRouter from './src/features/comments/comment.routes.js';
import likeRouter from './src/features/likes/like.routes.js';
import friendRouter from './src/features/friends/friend.routes.js';

const app = express();

app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
app.use(loggerMiddleware);

app.use('/api/users',userRouter);
app.use('/api/posts',jwtAuth,postRouter);
app.use('/api/comments',jwtAuth,commentRouter);
app.use('/api/likes',jwtAuth,likeRouter);
app.use('/api/friends',jwtAuth,friendRouter);
app.get('/',(req, res) =>{
    res.send('Welcome To Social Networking APIs.');
});

app.use((err, req, res, next)=>{
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    //server errors
    res.status(500).send('Something went wrong , Please try later.');
});

app.use((req, res) =>{
    res.status(404).send("API not found!")
});

app.listen(4000,()=>{
    console.log("Server is running at port 4000");
    connectUsingMongoose();
});