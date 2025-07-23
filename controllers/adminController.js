import express from "express";
import bcrypt from'bcrypt'
import Admin from '../models/admin.js'
import admin from "../models/admin.js";
export const login =async (req,res)=>{
   const { email, password } = req.body
    try {
        const data = await admin.findOne({ email })
        if (!data) {
            return res.status(404).json({ message: "admin not found", success: false })
        }
        const hashed = await bcrypt.compare(password, data.password)
        if (hashed == false) {
            return res.status(400).json({ message: "Password incorrect", success: false })
        }
            req.session.adminId = data._id;
            return res.status(200).json({ message: "Admin logged in", success: true })
    }
    catch (err) {
        res.json({ message: "error", success: false })
        console.log(err);
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