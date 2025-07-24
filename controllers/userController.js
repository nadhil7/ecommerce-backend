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
        req.session.userId = data._id
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
        const userdata = await user.findById(req.params.id, { password: 0, _id: 0, role: 0, status: 0, __v: 0 });
        if (!userdata) {
            return res.status(404).json({ message: "user not found" })
        }
        return res.json(userdata)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" })
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
        return res.status(500).json({ message: "internal server error" })
    }
}

export const deleteuser = async (req, res) => {
    try {
        const user = await user.findById(req.params.id)
        if(!user){
        res.status(404).json({ message: "no user found" })
        }
        if (req.session.userId == req.params.id) {
            await user.findByIdAndDelete(req.params.id);
            req.session.destroy()
            res.status(200).json({ message: "user deleted successfully" })
        }
        res.status(404).json({ message: "cannot delete the user" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error occured" })
    }
}
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false })
        }
        else {
            res.status(200).json({message:"logout completed", success: true })

        }
    })

}