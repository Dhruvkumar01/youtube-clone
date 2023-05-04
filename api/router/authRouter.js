import express from 'express'
import { googleAuth, signin, signup } from '../controller/authController.js';

const authRouter= express.Router();

// SIGNUP USER 
authRouter.post('/signup', signup)

// SIGNIN USER 
authRouter.post('/signin', signin)
// GOOGLE AUTH 
authRouter.post('/google', googleAuth)

export default authRouter