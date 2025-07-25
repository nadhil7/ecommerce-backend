import express from 'express';
import multer from 'multer';
import { signup, getUserById, edituser, deleteuser, logout } from '../controllers/userController.js'
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
router.post('/signup', upload, signup)
router.use((req, res, next) => {
    if (req.session.userId) {
        next()
    }
    else {
        return res.status(404).json({ message: "Entery restricted" })
    }
})
router.delete("/log/",logout)
router.get('/:id', getUserById)
router.delete('/:id', deleteuser)
router.put('/:id', upload, edituser)
export default router