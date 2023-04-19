import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img:{
        type: String
    },
    subscriberNo:{
        type: Number,
        default: 0
    },
    subscriber: {
        type: [String],
        default: []
    }
}, 
    {timestamps: true}
);

const User= mongoose.model('User', userSchema)

export default User;