import cart from '../models/cart.js'

export const showcart = async(req,res)=>{
    try{
        const userId = req.session.userId
        const cartdata = await cart.aggregate({

        })
        
        // return res.status(200).json(cartdata)
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
        return res.status(500).json({message:"error:- can't add to cart"})
    }
}
export const editcart = async(req,res)=>{
    try{
        const userId = req.session.userId;
        const {reqquantity,reqproductId}=req.body
        let cartdata =await cart.findById({userId:userId})
        console.log(cartdata);
          const itemindex = cartdata.items.findIndex(index => index.productId==reqproductId)
            if(itemindex>-1)
            {
                let productedit = cartdata.items[itemindex]
                productedit.quantity = reqquantity
                cartdata.items[itemindex]=productedit
                await cart.updateOne({userId:userId},
                    productedit
                )
                return res.status(404).json({message:"product edited successfully"})
            }
            else{
                return res.status(404).json({message:"no product to edit"})
            }
        
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"error:- can't edit the cart"})
    }
}

export const deletecart = async(req,res)=>{
    try{
        const userId = req.session.userId
        const cartdata = await cart.findOne({userId:userId})
        if(!cartdata)
        {
        return res.status(500).json({message:" there cart is no cart found"})
        }
        const cartdel = await cart.findByIdAndDelete(userId)
        if(!cartdel)
        {
        return res.status(500).json({message:"can't delete the cart"})
        }
        return res.status(500).json({message:"cart deleted successfully"})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"error:- while deleting the cart"})
    }
}