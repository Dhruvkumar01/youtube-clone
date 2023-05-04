import mongoose from "mongoose";

const commentSchema= new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    videoId:{
        type: String,
    },
    commentId:{
        type: String
    },
    numberOfComments:{
        type: Number,
        default: 0
    },
    desc:{
        type: String,
        required: true
    },
    likes:{
        type: [String],
        default: []
    },
    dislikes:{
        type: [String],
        default: []
    }
}, 
    {timestamps: true}
);

const Comment= mongoose.model('Comment', commentSchema)

export default Comment;