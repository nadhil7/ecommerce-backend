import express from 'express';
import session from 'express-session'
import {logout,login,allusers} from '../controllers/adminController.js'
const router = express.Router()
router.post("/login",login)
router.use((req,res,next)=>{
    if(!req.session.adminId)
    {
        return res.status(404).json({message:"entry restricted!!"})
    }
    next()
})
router.delete("/logout",logout)
router.get("/users",allusers)

export default router