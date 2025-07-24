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
            return res.status(404).json({message:"category not found !"})
        }
        await category.findByIdAndUpdate(req.params.id,{
            name,discription
        })
        return res.status(200).json({message:""})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"error ocured while editing category"})
    }
}

export const categorydelete =async(req,res)=>{
    try{
        const data = await findById(req.params.id)
        if(!data)
        {
            return res.status(404).json({message:"no category found to delete"})
        }
        await category.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"category deleted successfully"})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"error while deleting category"})
    }
}