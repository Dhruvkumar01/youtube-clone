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
export const getComments= async (req, res, next)=>{
    try {
        const comments= await Comment.find({videoId: req.params.videoId});
        res.status(201).json(comments)
    } catch (err) {
        next(err);
    }
}