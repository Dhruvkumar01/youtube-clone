import express from 'express'
import { addComment, deleteComment, dislikeComment, getComments, getCommentsOfComment, likeComment, replyComment } from '../controller/commentController.js';
import { verifyToken } from '../verifyToken.js';

const router= express.Router();

// ADD COMMENT 
router.post('/', verifyToken, addComment)
router.delete('/:id', verifyToken, deleteComment)  //DELETE COMMENT
router.get('/:videoId', getComments)    //GET ALL COMMENTS OF VIDEO
router.get('/find/:commentId', getCommentsOfComment)    //GET ALL COMMENTS OF COMMENT
router.put('/like/:id', verifyToken, likeComment)    //LIKE A COMMENT
router.put('/dislike/:id', verifyToken, dislikeComment)    //DISLIKE A COMMENT
router.put('/reply/:id', verifyToken, replyComment)    //REPLY ON COMMENT

export default router