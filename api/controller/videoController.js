import { createError } from '../error.js';
import User from '../model/User.js';
import Video from '../model/Video.js'

export const addVideo= async (req, res, next)=>{
    try {
        const newVideo = new Video({userId: req.user.id , ...req.body});
        await newVideo.save();
        res.status(200).json("Video Saved Succesfully");
    } catch (err) {
        next(err)
    }
}

export const deleteVideo= async (req, res, next)=>{
    try {
        const video= await Video.findById(req.params.id);
        if(!video) return next(createError(404, "video not found"));
        if(req.user.id !== video.userId) return next(createError(400, "you can update only your video"));

        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("video deleted successfully");
    } catch (err) {
        next(err);
    }
}
export const updateVideo= async (req, res, next)=>{
    try {
        const video= await Video.findById(req.params.id);
        if(!video) return next(createError(404, "video not found"));
        if(req.user.id !== video.userId) return next(createError(400, "you can update only your video"));

        const updatedVideo= await Video.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        {new: true});
        res.status(200).json(updatedVideo)
    } catch (err) {
        next(err)
    }
}

export const getVideo= async (req, res, next)=>{
    try {
        const video= await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err)
    }
}

export const addView= async (req, res, next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id, {$inc: {views: 1}});
        res.status(200).json("view increased by one")
    } catch (err) {
        next(err);
    }
}

export const trendingVideos = async (req, res, next)=>{
    try {
        const videos= await Video.find().sort({views: -1}).limit(15);
        res.status(200).json(videos)
    } catch (err) {
        next(err);
    }
}

export const randomVideos = async (req, res, next)=>{
    try {
        const videos= await Video.aggregate([{$sample: {size: 40}}]);
        res.status(200).json(videos)
    } catch (err) {
        next(err);
    }
}

export const subscribedVideos = async (req, res, next)=>{
    try {
        const user= await User.findById(req.user.id);
        const subscribedChannels= user.subscribedChannel;
        const list= await Promise.all(
            subscribedChannels.map(async (channelId) =>{
                return await Video.find({userId: channelId})
            })
        );
        res.status(200).json(list.flat().sort((a, b)=> b.createdAt- a.createdAt));
    } catch (err) {
        next(err);
    }
}

export const getByTag= async(req, res, next)=>{
    try {
        const tags= req.query.tags.split(",");
        const videos= await Video.find({tags: {$in: tags}}).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const search= async(req, res, next)=>{
    try {
        const query= req.query.q
        const videos= await Video.find({name: {$regex: query, $options: "i"}}).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}