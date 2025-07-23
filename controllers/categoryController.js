import category from '../models/category.js'

export const categorylist = async(req,res)=>{
    try{
        const catogeries = category.find({});
        if(!catogeries)
        {
            return res.status(404).json({message:"category Not found!"})
        }
        return res.status(200).json({categories})
    }
    catch(err)
    {
        console.log(err);
        return res.status(200).json({message:"error occured while listing the categories"})
    }
} 

export const categoryadd =async(req,res)=>{
    try{
        const {name,discription}= req.body
        await category.insertOne({
            name,discription
        })
        return res.status(200).json({message:"category added successfully"})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"error occured while adding categories"})
    }
}

export const categoryedit =async(req,res)=>{
    const {name,discription} = req.body
    try{
        const data = await category.findById(req.params.id)
        if(!data)
        {
            return res.status.
        }
    }
    catch(err)
    {

    }
}