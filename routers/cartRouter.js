import express from 'express';
import { showcart, addtocart, editcart } from '../controllers/cartController.js'
const router = express.Router();

router.use((req, res, next) => {
    if (req.session.userId) {
        next()
    }
    else {
        return res.status(404).json({ message: "entry restricted" })
    }
})
router.get("/", showcart)
router.post("/", addtocart)
router.put("/", editcart)





export default router;