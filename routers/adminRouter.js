import express from 'express';
import session from 'express-session'
import {logout,login} from '../controllers/adminController.js'
const router = express.Router()
router.get("/login",login)
router.use((req,res,next)=>{
    if(!req.session.adminId)
    {
        return res.status(404).json({message:"entry restricted!!"})
    }
    next()
})
router.delete("/logout",logout)
export default router