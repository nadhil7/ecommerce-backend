import express from 'express';
import multer from 'multer';
import product from '../models/product.js';
import {productlist,productadd,productedit,productdelete} from '../controllers/productController.js';
const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const fileNameSplit = file.originalname.split(".");
        const fileName = fileNameSplit[fileNameSplit?.length - 1];

        req.filename = `${file.originalname}_${Date.now()}.${fileName}`
        cb(null, req.filename)
    }
})
const upload = multer({
    storage: storage
}).single('image')
router.get('/',productlist)
router.use((req,res,next)=>{
    if(!req.session.adminId)
    {
    return res.status(404).json({meassage:"entry restricted"})
    }
    else{
        next()
    }
})
router.post('/add',upload,productadd)
router.put('/edit/:id',upload,productedit)
router.delete('/delete/:id',productdelete)
export default router
