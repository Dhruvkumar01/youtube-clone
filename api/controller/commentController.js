import { createError } from "../error.js";
import Comment from "../model/Comment.js";

export const addComment= async (req, res, next)=>{
    const newComment= new Comment({userId: req.user.id, ...req.body})
    try {
        const savedComment= await newComment.save();
        res.status(200).json(savedComment)
    } catch (err) {
        next(err);
    }
}

export const deleteComment= async (req, res, next)=>{
    try {
        const comment= await Comment.findById(req.params.id);
        if(!comment) return next(createError(404, "comment not found"));
        if(comment.userId !== req.user.id) return next(createError(401, "you can delete only your comment"));

        await Comment.findByIdAndDelete(req.params.id);
        res.status(201).json("comment deleted sucessfully");
    } catch (err) {
        next(err);
    }
}

// find all comments of video 
export const getComments= async (req, res, next)=>{
    try {
        const comments= await Comment.find({videoId: req.params.videoId}).sort({updatedAt: -1});
        res.status(201).json(comments)
    } catch (err) {
        next(err);
    }
}

// find all comments of comment 
export const getCommentsOfComment= async (req, res, next)=>{
    try {
        const comments= await Comment.find({commentId: req.params.commentId}).sort({updatedAt: -1}).limit(10);
        res.status(201).json(comments)
    } catch (err) {
        next(err);
    }
}



export const likeComment = async (req, res, next)=>{
    try {
        if(req.body.userId=== req.user.id){
            const comment= await Comment.findById(req.params.id);
            if(!comment) return next(createError(404, "comment not found"));
            const updatedComment= await Comment.findByIdAndUpdate(req.params.id, {
                    $addToSet: {likes: req.user.id},
                    $pull: {dislikes: req.user.id},
                }
            )
            res.status(200).json("you liked comment");
        } else{
            return next(createError(403, "you can like comment by only own user id"));
        }
    } catch (err) {
        next(err)
    }
};

export const dislikeComment = async (req, res, next)=>{
    try {
        if(req.body.userId=== req.user.id){
            const comment= await Comment.findById(req.params.id);
            if(!comment) return next(createError(404, "comment not found"));
            const updatedComment= await Comment.findByIdAndUpdate(req.params.id, {
                    $addToSet: {dislikes: req.user.id},
                    $pull: {likes: req.user.id},
                }
            )
            res.status(200).json("you liked comment");
        } else{
            return next(createError(403, "you can like comment by only own user id"));
        }
    } catch (err) {
        next(err)
    }
};

export const replyComment= async (req, res, next)=>{
    try {
        if(req.user.id===req.body.userId){
            const comment= await Comment.findById(req.params.id);
            if(!comment) return next(createError(404, "comment not found"));
            const newComment= new Comment(req.body);
            await newComment.save();
            await Comment.findByIdAndUpdate(req.body.commentId, { $inc: {numberOfComments: 1}});
            res.status(200).json("replies added suceesfully");
        } else{
            next(createError(402, "you can only reply a comment by your account"))
        }
    } catch (err) {
        next(err);
    }
}