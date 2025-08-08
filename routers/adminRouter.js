import express from 'express';
import {logout,login,allusers,showallorders,statusUpdate} from '../controllers/adminController.js'
import { middleware } from '../middleware/adminmiddleware.js';
import { edituser } from '../controllers/userController.js';

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

router.patch("/useredit/:id",statusUpdate)
router.delete("/logout",logout)
router.get("/users",allusers)
router.get("/orders",showallorders)

export default router