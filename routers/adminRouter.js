import express from 'express';
import session from 'express-session'
import {logout} from '../controllers/adminController.js'
const router = express.Router()
router.delete("/logout",logout)
export default router