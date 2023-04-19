import { createError } from "../error.js";
import User from "../model/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup= async (req, res, next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser= User({...req.body, password: hash});
        await newUser.save();
        res.status(200).json("user saved sucessfully");
    } catch (err) {
        next(err)
    }
};

export const signin= async (req, res, next)=>{
    try {
        const user= await User.findOne({name: req.body.name});
        if(!user) return next(createError(404, "user not found"));

        const isCorrect= await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) return next(createError(400, "username and password does not match"));

        const token= jwt.sign({id: user._id}, process.env.JWT)
        const {password, ...others}= user._doc
        res.cookie("access_token", token ,{
            httpOnly: true
        }).status(200).json(others)
    } catch (err) {
        next(err)
    }
};
