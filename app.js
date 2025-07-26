import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import mongostore from "connect-mongo"
import adminRouter from './routers/adminRouter.js'
import userRouter from './routers/userRouter.js'
import loginRouter from './routers/loginRouter.js'
import productRouter from './routers/productRouter.js'
import categoryRouter from './routers/catrgoryRouter.js'
import cartRouter from './routers/cartRouter.js'
import orderRouter from './routers/orderRouter.js'

//database
const uri = "mongodb://127.0.0.1:27017/ecomercebackend"
mongoose.connect(uri).then(() => {
    console.log("database connected")
})
//middlewares
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: "hahaha",
    resave: false,
    saveUninitialized: false,
    store: mongostore.create({ mongoUrl: "mongodb://127.0.0.1:27017/ecomercebackend" })
}))
app.use(express.static('uploads'))
app.use("/admin", adminRouter);
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message
    next()
})

//router directions
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
//server start  
app.listen(4000, (req, res) => {
    return console.log("server started %");
})