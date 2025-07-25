import cart from '../models/cart.js'

export const showcart = async(req,res)=>{
    try{
        const userId = req.session.userId
        const cartdata = await cart.findOne({userId:userId})
        return res.status(200).json(cartdata)
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"error can't show the cart"})
    }
}
export const addtocart = async(req,res)=>{
    try{
         const userId = req.session.userId
        const {quantity,productId} = req.body
        const cartdata = await cart.findOne({userId:userId})
        if(!cartdata)
        {
            const newcart = await cart.create({
                userId,
                items:[{
                    productId,
                    quantity
                }]   
            })
             return res.status(200).json(cartdata)
        }
        else{
            const itemindex = cartdata.items.findIndex(index => index.productId==productId)
            if(itemindex>-1)
            {
                let productadd = cartdata.items[itemindex]
                productadd.quantity += quantity
                cartdata.items[itemindex]=productadd
            }
            else{
                cartdata.items.push({
                    productId,quantity
                })
            }
            const addedcart =await cartdata.save()
            return res.status(200).json(addedcart)
        }
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"error can't add to cart"})
    }
}
export const editcart = async(req,res)=>{
    try{
        const userId = req.session.userId
        console.log(userId);
        res.send("hello")
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"error can't edit the cart"})
    }
}