import category from '../models/category.js'
import cart from '../models/cart.js'
import product from '../models/product.js'

export const categorylist = async (req, res) => {
    try {
        const catogeries = await category.find({}, { __v: 0 });
        if (!catogeries) {
            return res.status(404).json({ message: "category Not found!" })
        }
        return res.status(200).json(catogeries)
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ message: "error occured while listing the categories" })
    }
}

export const categoryadd = async (req, res) => {
    try {
        console.log(req.body);
        const { name, discription } = req.body

        if (name != null && discription != null) {
            const catdata = await category.insertOne({
                name, discription
            })
            return res.status(200).json({ message: "category added successfully", addedcategory: catdata })
        }
        else {
            return res.status(404).json({ message: "name and discription cannot be null" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error occured while adding categories" })
    }
}

export const categoryedit = async (req, res) => {
    const { name, discription } = req.body
    try {
        const data = await category.findById(req.params.id)
        if (!data) {
            return res.status(404).json({ message: "category not found !" })
        }
        await category.findByIdAndUpdate(req.params.id, {
            name, discription
        })
        return res.status(200).json({ message: "Category Edited Succesfully" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error ocured while editing category" })
    }
}

export const categorydelete = async (req, res) => {
    try {
        const data = await category.findById(req.params.id)
        if (!data) {
            return res.status(404).json({ message: "no category found to delete" })
        }
        const productdata = await product.deleteMany({ categoryId: req.params.id })
        if (productdata) {
        await category.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "category deleted successfully" })
        }
        else{
            return res.status(300).json({ message: "error while deleting category" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error while deleting category" })
    }
}