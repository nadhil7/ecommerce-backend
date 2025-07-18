import express from'express'
import mongoose from 'mongoose'
import session from 'express-session'
import mongostore from "connect-mongo"
import adminRouter from './routers/adminRouter.js'
import userRouter from './routers/userRouter.js'
import loginRouter from './routers/loginRouter.js'
import productRouter from './routers/productRouter.js'
const uri = "mongodb://127.0.0.1:27017/ecomercebackend"
mongoose.connect(uri).then(()=>{
    console.log("database connected")
})
const app = express();
app.listen(4000,(req,res)=>{
    return console.log("server started %");
})
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret:"hahaha",
    resave:false,
    saveUninitialized:false,
    store:mongostore.create({mongoUrl:"mongodb://127.0.0.1:27017/ecomercebackend"})
}))
app.use(express.static('uploads'))
// app.use("/admin",adminRouter);
app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message
    next()
})
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/admin",adminRouter);
app.use("/login",loginRouter);
