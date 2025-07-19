import express from "express";
import user from '../models/user.js'

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false })
        }
        else {
            res.json({ success: true })

        }
    })

}