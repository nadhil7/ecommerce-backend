import bcrypt from 'bcrypt'
import admin from "../models/admin.js";
import user from '../models/user.js'
import order from '../models/order.js';
export const login = async (req, res) => {
    console.log(req.body);
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
        res.json({ message: err, success: false })
        console.log(err);
    }
}
export const allusers = async (req, res) => {
    try {
        const users = await user.find({}, { __v: 0, password: 0 })
        console.log(users);
        return res.status(200).json(users)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "users not found" })
    }
}
export const logout = (req, res) => {
    req.session.adminId = null;
    if (req.session.adminId == null) {
        res.status(200).json({ message: "logout completed", success: true })
    }
    else {
        return res.status(500).json({ success: false })
    }
}
export const showallorders = async (req, res) => {
    try {
        const data = await order.find({}, { __v: 0 })
        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "Orders are empty" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const statusUpdate = async (req, res) => {
    try {
        console.log(req.params.id);
        const userdata = await user.findById(req.params.id)
        if (userdata.status) {
            await user.findByIdAndUpdate(req.params.id, {
                status: false
            })
            return res.status(200).json(false)
        }
        else {
            await user.findByIdAndUpdate(req.params.id, {
                status: true
            })
            return res.status(200).json(true)
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}