import express from 'express'
import { verifyToken } from '../verifyToken.js';
import { addHistory, deleteAllHistory, deleteHistory, getAllHistory } from '../controller/historyController.js';

const router= express.Router();

router.post('/', verifyToken, addHistory ) // ADD VIDEO HISTORY
router.delete('/:id', verifyToken, deleteHistory ) // DELETE SPECIFIC VIDEO HISTORY
router.delete('/all/:userId', verifyToken, deleteAllHistory ) // DELETE ALL HISTORY
router.get('/all/:userId', verifyToken, getAllHistory) // GET ALL VIDEO HISTORY OF USER

export default router