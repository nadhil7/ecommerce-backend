import product from '../models/product.js'
import category from '../models/category.js'

export const productlist =async(req,res)=>{
    try{
        const products = await product.find({},{__v:0});
        return res.status(200).json(products)
    }
    catch(err)
    {
        res.json({message:"error occured"})
        console.log(err);
    }
}
export const productadd =async (req,res)=>{
    try{
        const {name,price ,discription,categoryname,brand}= req.body
        const categoryfind = await category.findOne({categoryname})
        const categoryId = categoryfind._id
       const adding = await product.insertOne({
            name,
            price,
            brand,
            categoryId,
            discription,
            image:req.filename
        })
        return res.status(200).json({message:"product added succesfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"error occured"})
    }
}

export const productedit = async(req,res)=>{
    try{
        const {name,price,brand,category,discription} = req.body
       const editing= await product.findById(req.params.id)
       if(!editing)
       {
        return res.status(404).json({message:"product not found"});
       }
       await product.findByIdAndUpdate(req.params.id,{
        name,
        price,
        brand,
        category,
        discription,
        image:req.filename
       })
       return res.status(200).json({message:"product updated successfully"})
    } 
    catch(err){
        console.log(err);
        return res.status(500).json({message:"error occured"})
    }
}

export const productdelete = async(req,res)=>{
    try{
        const data =await product.findById(req.params.id)
        if(!data)
        {
            return res.status(404).json({message:"no product found"})
        }
        await product.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"product deleted!"})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"error while deleting product"})
    }
}