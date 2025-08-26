import express from 'express'
import { createorder, paymentStatus, showOrder, cancelOrder, showallorders, shipstatus } from '../controllers/orderController.js'

const router = express.Router()
//middleware


//routers
router.post("/create", createorder)
router.patch("/status/:id", paymentStatus)
router.patch("/shipstatus/:id", shipstatus)
router.get("/myorder/:id", showOrder)
router.get("/allorders/:id", showallorders)
router.delete("/cancel/:id", cancelOrder)
//exports
export default router

