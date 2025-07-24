import express from 'express';
import {showcart} from '../controllers/cartController.js'
const router = express.Router();

router.get("/",showcart)





export default router;