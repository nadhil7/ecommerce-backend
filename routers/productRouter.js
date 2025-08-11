import express from 'express';
import multer from 'multer';
import { productlist, productadd, productedit, productdelete, findproduct } from '../controllers/productController.js';
import { middleware } from '../middleware/adminmiddleware.js';


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
//router
router.get('/', productlist)
router.get('/find/:id', findproduct)
//middleware
router.use(middleware)
//roters
router.post('/add', upload, productadd)
router.put('/edit/:id', upload, productedit)
router.delete('/delete/:id', productdelete)
//exports
export default router
