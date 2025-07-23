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
export const productadd =async (req,res)=>{
    try{
        const {name,price ,discription,brand}= req.body
       const adding = await product.insertOne({
            name,
            price,
            brand,
            discription,
            image:req.filename
        })
        console.log(adding);
        return res.status(200).json({message:"product added succesfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"error occured"})
        
    }
}