import express from 'express';
import session from 'express-session'
import {signup,} from '../controllers/userController.js'
const router = express.Router()
router.post('/signup',signup)
export default router