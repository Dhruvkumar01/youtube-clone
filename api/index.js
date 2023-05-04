import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './router/userRouter.js';
import authRouter from './router/authRouter.js';
import commentRouter from './router/commentRouter.js';
import videoRouter from './router/videoRouter.js';
import historyRouter from './router/historyRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app= express();
dotenv.config();

const connect= ()=> {
    mongoose.connect(process.env.MONGO_DB)
    .then(()=> {
        console.log("DB is connected")
    })
    .catch(err =>{
        console.log(err);
    })
}

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/comments', commentRouter)
app.use('/api/videos', videoRouter)
app.use('/api/historys', historyRouter)

// error handeler 
app.use((err, req, res, next)=> {
    const status= err.status || 500;
    const message= err.message || "something went wrong"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

const port= process.env.PORT;
app.listen(port, ()=>{
    connect();
    console.log(`app is conected on ${port}`);
})