import express from "express";
import user from '../models/user.js'
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    try {
        const data = await user.findOne({ email })
        if (!data) {
            return res.status(404).json({ message: "no user found", success: false })
        }
        const hashed = await bcrypt.compare(password, data.password)
        if (hashed == false) {
            return res.status(400).json({ message: "Password incorrect", success: false })
        }
        req.session.userId = data._id;
        return res.status(200).json({ message: "User logged in ", success: true })
    }
    catch (err) {
        res.json({ message: "error", success: false })
        console.log(err);
    }
}