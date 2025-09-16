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
import cors from 'cors'

//database
const uri = "mongodb+srv://nadhunadhil33429_db_user:Admin123shanu@cluster1.noy1nfg.mongodb.net/ecomercebackend?retryWrites=true&w=majority&appName=Cluster1";
mongoose.connect(uri).then(() => {
    console.log("database connected")
})
//middlewares
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: ["http://13.232.71.99:5173","http://localhost:5173"], credentials: true }))
app.use(session({
    secret: "hahaha",
    resave: false,
    saveUninitialized: false,
    store: mongostore.create({ mongoUrl:"mongodb+srv://nadhunadhil33429_db_user:Admin123shanu@cluster1.noy1nfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1" })
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