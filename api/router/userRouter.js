import express from 'express'
import { deleteUser, dislikeVideo, getUser, likeVideo, subscribe, unsubscribe, updateUser, } from '../controller/userController.js';
import { verifyToken } from '../verifyToken.js';

const router= express.Router();

// GET USER 
router.get('/find/:id', getUser)
router.put('/:id', verifyToken, updateUser)  // UPDATE USER 
router.delete('/:id', verifyToken, deleteUser)  // DELETE USER 
router.put('/sub/:id', verifyToken, subscribe)   // SUBSCRIBE CHANNEL 
router.put('/unsub/:id', verifyToken, unsubscribe)  // UNSUBSCRIBE CHANNEL 
router.put('/dislike/:id', verifyToken, dislikeVideo)  // DISLIKE VIDEO 
router.put('/like/:id', verifyToken, likeVideo)  // LIKE VIDEO 
export default router
