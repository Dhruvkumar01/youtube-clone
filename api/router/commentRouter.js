import express from 'express'
import { addComment, deleteComment, getComments } from '../controller/commentController.js';
import { verifyToken } from '../verifyToken.js';

const router= express.Router();

// ADD COMMENT 
router.post('/', verifyToken, addComment)
router.delete('/:id', verifyToken, deleteComment)  //DELETE COMMENT
router.get('/:videoId', getComments)    //GET ALL COMMENTS OF VIDEO

export default router