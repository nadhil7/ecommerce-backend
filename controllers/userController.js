import express from "express";
import user from '../models/user.js'
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';


export const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = await req.body
        const salt = 10;
        const hashedpass = await bcrypt.hash(password, salt);
        const data = new user({
            name,
            email,
            password: hashedpass,
            phone,
            image: req.filename
        })
        await data.save();
        req.session.userId =data._id
        return res.json({
            message: "user created",
            type: "success"
        })
    }
    catch (err) {
        res.json({ message: "error occured!" });
        console.log(err);
    }
}
export const getUserById = async (req, res) => {
    try {
        const userdata = await user.findById(req.params.id,{password:0,_id:0,role:0,status:0,__v:0});
       if(!userdata)
       {
        return res.status(404).json({message:"user not found"})
       }
       return res.json(userdata)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message:"internal server error" })
    }
}
export const edituser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        await user.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password,
            phone,
            image: req.filename
        })
        return res.json({ message: "user updated" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message:"internal server error"})
    }
}

export const deleteuser =async(req,res)=>{
    try{
        await user.findByIdAndDelete(req.params.id);
        res.json({message:"user deleted successfully"})
    }
    catch(err)
    {
        res.json({message:"error occured"})
        console.log(err);
    }
}