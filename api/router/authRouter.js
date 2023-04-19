import express from 'express'
import { signin, signup } from '../controller/authController.js';

const authRouter= express.Router();

// SIGNUP USER 
authRouter.post('/signup', signup)

// SIGNIN USER 
authRouter.post('/signin', signin)
// GOOGLE AUTH 

export default authRouter