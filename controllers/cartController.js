import cart from '../models/cart.js'

export const showcart = async(req,res)=>{
    try{
        const userId = req.session.userId
        console.log(userId);
        res.send("hello")
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"eror can't show the cart"})
    }
}