import express from 'express';
import session from 'express-session'
import {login,} from '../controllers/loginController.js'
const router = express.Router()
router.get('/',login)
export default router