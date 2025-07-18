import express from'express'
import mongoose from 'mongoose'
import adminRouter from './routers/adminRouter.js'
const uri = "mongodb://127.0.0.1:27017/ecomercebackend"
mongoose.connect(uri).then(()=>{
    console.log("database connected")
})
const app = express();
