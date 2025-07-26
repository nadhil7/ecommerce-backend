import express from 'express';
import {categorylist,categoryadd,categoryedit,categorydelete} from '../controllers/categoryController.js'
import { middleware } from '../middleware/adminmiddleware.js';
const router = express.Router()
//router
router.get("/",categorylist)
//middleware
router.use(middleware)
//routers
router.post("/",categoryadd)
router.put("/:id",categoryedit)
router.delete("/:id",categorydelete)


export default router