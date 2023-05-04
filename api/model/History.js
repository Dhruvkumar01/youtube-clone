import mongoose from "mongoose";

const schema= new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    }
},{timestamps: true})

const History= mongoose.model('History', schema);

export default History