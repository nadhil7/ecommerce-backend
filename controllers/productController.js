import product from '../models/product.js'

export const productlist =async(req,res)=>{
    try{
        const products = await product.find();
        res.json({products})
    }
    catch(err)
    {
        res.json({message:"error occured"})
        console.log(err);
    }
}