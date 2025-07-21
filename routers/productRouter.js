import express from 'express';
import multer from 'multer';
import product from '../models/product.js';
import {productlist} from '../controllers/productController.js';
const router = express.Router()
router.post*("/add")
router.get('/',productlist)
export default router
