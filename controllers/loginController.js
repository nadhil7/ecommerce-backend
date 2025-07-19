import express from "express";
import user from '../models/user.js'
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await user.findOne({email})
        if (!data) {
            return res.json({ message: "no user found", success: "true" })
        }
        const hashed =await bcrypt.compare(password, data.password)
        if (hashed == false) {
            return res.json({ message: "Password incorrect", success: "true" })
        }
         req.session.message={message:"login succesfull",success:"true"}
         res.json({message:"logged in"})
    }
    catch (err) {
        res.json({message:"error",success:"false"})
        console.log(err);
    }
}