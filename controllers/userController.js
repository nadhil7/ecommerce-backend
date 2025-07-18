import express from "express";
import user from '../models/user.js'
import bcrypt from 'bcrypt';


export const signup = async (req, res) => {
    try {
        const { name, email, password, phone } =await req.body
        const salt = 10;
        const hashedpass = await bcrypt.hash(password, salt);
        const data = new user({
            name, 
            email, 
            password: hashedpass,
            phone
        })
        await data.save();
        return res.json({message:"user created",
            type:"success"
        })
    }
    catch (err) {
        res.json({message:"error occured!"});
    }
} 