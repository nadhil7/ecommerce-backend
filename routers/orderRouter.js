import express from 'express'
import { createorder, paymentStatus, showOrder, cancelOrder } from '../controllers/orderController.js'

const router = express.Router()
//middleware


//routers
router.post("/create", createorder)
router.patch("/status/:id", paymentStatus)
router.get("/myorder/:id", showOrder)
router.delete("/cancel/:id", cancelOrder)
//exports
export default router

