import { createError } from "../error.js";
import History from "../model/History.js";
import Video from "../model/Video.js";

export const addHistory= async (req, res, next)=>{
    try {
        const {videoId, userId}= req.body;
        if(userId=== req.user.id){
            const video= await Video.findById(videoId);
            if(!video) return next(createError(404, "video not found"));
            const newHistory= new History(req.body);
            await newHistory.save();
            res.status(200).json("this videos is added into your watch history");
        } else{
            next(createError(401, "You are not Authorized to do so"))
        }
    } catch (err) {
        next(err);
    }
};

export const deleteHistory= async (req, res, next)=>{
    try {
        await History.findByIdAndDelete(req.params.id)
        res.status(200).json("Video has been removed from your watch history");
    } catch (err) {
        next(err);
    }
};

export const deleteAllHistory= async (req, res, next)=>{
    try {
        await History.deleteMany({userId: req.params.userId})
        res.status(201).json("all history is deleted");
    } catch (err) {
        next(err);
    }
}

export const getAllHistory= async (req, res, next)=>{
    try {
        const userId= req.params.userId;
        const history = await History.aggregate([
            {
                $match:{
                    userId: userId
                }
            },
            {
                $group:{
                    _id: {
                        month:{$month: "$createdAt"},
                        day:{$dayOfMonth: "$createdAt"},
                        year:{$year: "$createdAt"},
                    },
                    historys: {$push: {videoId: "$videoId", historyId: "$_id"}}
                }
            }
        ]);
        res.status(200).json(history)
    } catch (err) {
        next(err);
    }
}