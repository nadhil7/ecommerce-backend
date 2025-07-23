import express from 'express';
import session from 'express-session'
import {logout,login} from '../controllers/adminController.js'
const router = express.Router()
router.get("/login",login)
router.delete("/logout",logout)
export default router