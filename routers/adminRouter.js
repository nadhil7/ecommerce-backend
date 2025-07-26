import express from 'express';
import {logout,login,allusers,showallorders} from '../controllers/adminController.js'
import { middleware } from '../middleware/adminmiddleware.js';

const router = express.Router()
router.post("/login",login)


// router.use((req,res,next)=>{
//     if(!req.session.adminId)
//     {
//         return res.status(404).json({message:"entry restricted!!"})
//     }
//     next()
// })
router.use(middleware)


router.delete("/logout",logout)
router.get("/users",allusers)
router.get("/orders",showallorders)

export default router