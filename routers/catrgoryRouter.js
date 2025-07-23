import express from 'express';
import {categorylist,categoryadd,categoryedit} from '../controllers/categoryController.js'
const router = express.Router()

router.get("/",categorylist)
router.post("/add",categoryadd)
router.put("/edit/:id",categoryedit)


export default router