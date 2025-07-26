import express from 'express';
import { showcart, addtocart, editcart, deletecart } from '../controllers/cartController.js'
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
router.post("/:id", addtocart)
router.put("/", editcart)
router.delete("/", deletecart)





export default router;