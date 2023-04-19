import express from 'express'
import { addVideo, addView, deleteVideo, getByTag, getVideo, randomVideos, search, subscribedVideos, trendingVideos, updateVideo } from '../controller/videoController.js';
import { verifyToken } from '../verifyToken.js';

const router= express.Router();

// CREATE VIDEO 
router.post('/', verifyToken, addVideo)
router.delete('/:id', verifyToken, deleteVideo)  // DELETE VIDEO 
router.put('/:id', verifyToken, updateVideo)  // UPDATE VIDEO 
router.get('/find/:id', getVideo) // GET VIDEO
router.put('/view/:id',verifyToken, addView)   // ADD VIEW
router.get('/trend', trendingVideos)    // GET TRENDING VIDEO
router.get('/random', randomVideos)    // GET RANDOM VIDEO
router.get('/sub', verifyToken, subscribedVideos)    // GET subscribed VIDEO 
router.get('/tag', getByTag)    // GET VIDEO BY TAG
router.get('/search', search)    // SEARCH VIDEO

export default router