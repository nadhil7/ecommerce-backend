import express from "express";
import user from '../models/user.js'
import bcrypt from 'bcrypt';
import { Cookie } from "express-session";

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await user.findOne({email})
        if (!data) {
            return res.status(404).json({ message: "no user found", success: false })
        }
        const hashed =await bcrypt.compare(password, data.password)
        if (hashed == false) {
            return res.status(400).json({ message: "Password incorrect", success: false })
        }
        req.session.userId = data._id;
        // req.params._id=data._id
        // Cookie=data._id
        return res.json({message:"logged in",success:true})
    }
    catch (err) {
        res.json({message:"error",success:false})
        console.log(err);
    }
}