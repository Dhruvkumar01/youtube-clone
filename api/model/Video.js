import mongoose from "mongoose";

const videoSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    img_url:{
        type: String,
        required: true
    },
    video_url:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes:{
        type: [String],
        default: []
    },
    dislike:{
        type: [String],
        default: []
    },
    tags:{
        type: [String],
        default: []
    },
    desc:{
        type: String
    }
}, 
    {timestamps: true}
);

const Video= mongoose.model('Video', videoSchema)

export default Video;