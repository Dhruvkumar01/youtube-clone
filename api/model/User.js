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
    },
    img:{
        type: String
    },
    // How many user subscribed this channel
    subscriberNo:{
        type: Number,
        default: 0
    },
    // Which Channel are subscribed by this User
    subscribedChannel: {
        type: [String],
        default: []
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
}, 
    {timestamps: true}
);

const User= mongoose.model('User', userSchema)

export default User;