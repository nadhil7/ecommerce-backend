import express from 'express';
import multer from 'multer';
import { signup, getUserById, edituser, deleteuser, logout } from '../controllers/userController.js';
import { middleware } from '../middleware/usermiddleware.js';
//express multer function
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
router.post('/signup', upload, signup)


//middleware
router.use(middleware)


//routers
router.delete("/log/",logout)
router.get('/:id', getUserById)
router.delete('/:id', deleteuser)
router.put('/:id', upload, edituser)


//export
export default router