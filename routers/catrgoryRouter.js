import express from 'express';
import {categorylist,categoryadd,categoryedit,categorydelete} from '../controllers/categoryController.js'
const router = express.Router()

router.get("/",categorylist)
router.use((req,res,next)=>{
    if(req.session.adminId)
    {
        next()
    }
    else{
        return res.status(404).json({message:"admin not logged in :- entry restricted"})
    }
})
router.post("/",categoryadd)
router.put("/:id",categoryedit)
router.delete("/:id",categorydelete)


export default router