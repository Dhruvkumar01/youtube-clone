import { createError } from "../error.js"
import User from "../model/User.js"

export const getUser= async (req, res, next)=>{
    try {
        const user= await User.findById(req.params.id);
        const {password, ...others}= user._doc;
        res.status(200).json(others);
    } catch (err) {
        next(err)
    }
};

export const updateUser= async (req, res, next)=>{
    try {
        if(req.params.id=== req.user.id){
            const updatedUser= await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            const {password, ...others}= updatedUser._doc;
            res.status(200).json(others)
        } else{
            return next(createError(403, "you can not update other user id"));
        }
    } catch (err) {
        next(err)
    }
};

export const deleteUser= async (req, res, next)=>{
    try {
        if(req.params.id=== req.user.id){
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user has been deleted")
        } else{
            return next(createError(403, "you can not update other user id"));
        }
    } catch (err) {
        next(err)
    }
};

export const subscribe = async (req, res, next)=>{
    try {
        if(req.params.id=== req.user.id){
            await User.findByIdAndUpdate(req.user.id, {
                $push: {subscriber: req.body.channelId},
            });
            await User.findByIdAndUpdate(req.user.id, {
                $inc: {subscriberNo: 1}
            });
            res.status(200).json("subscription succesFull")
        } else{
            return next(createError(403, "you can subscribe channel by only own user id"));
        }
    } catch (err) {
        next(err)
    }
};

export const unsubscribe = async (req, res, next)=>{
    try {
        if(req.params.id=== req.user.id){
            await User.findByIdAndUpdate(req.body.channelId, {
                $pull: {subscriber: req.params.id},
            });
            await User.findByIdAndUpdate(req.body.channelId, {
                $inc: {subscriberNo: -1}
            });
            res.status(201).json("unsubcription succesfull");
        } else{
            return next(createError(403, "you can unsubscribe channel by only own user id"));
        }
    } catch (err) {
        next(err)
    }
};

export const likeVideo = async (req, res, next)=>{
    try {
        if(req.params.id=== req.user.id){
            
            
        } else{
            return next(createError(403, "you can like video by only own user id"));
        }
    } catch (err) {
        next(err)
    }
};

export const dislikeVideo = async (req, res, next)=>{
    try {
        if(req.params.id=== req.user.id){
            
        } else{
            return next(createError(403, "you can dislike video by only own user id"));
        }
    } catch (err) {
        next(err)
    }
};