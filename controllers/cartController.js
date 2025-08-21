import mongoose from 'mongoose';
import cart from '../models/cart.js'

export const showcart = async (req, res) => {
    try {
        const userId = req.session.userId
        const cartdata = await cart.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            {
                $project: {
                    _id: 0,
                    productId: "$items.productId",
                    quantity: "$items.quantity",
                    name: "$productDetails.name",
                    price: "$productDetails.price",
                    image: "$productDetails.image",
                    discription: "$productDetails.discription",
                    subTotal: {
                        $multiply: ["$items.quantity", "$productDetails.price"]
                    }
                }
            },

        ]);
        if (cartdata.length == 0) {
            return res.status(404).json({ message: "cart is empty" })
        }
        const grandtotal = cartdata.reduce((sum, item) => sum + item.subTotal, 0)
        return res.status(200).json({ items: cartdata, total: grandtotal })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error can't show the cart" })
    }
}
export const addtocart = async (req, res) => {
    try {
        const productId = req.params.id
        const userId = new mongoose.Types.ObjectId(req.session.userId)
        const { quantity1 } = req.body
        const quantity = Number(quantity1)
        const cartdata = await cart.findOne({ userId: userId }, { __v: 0 })
        if (!cartdata) {
            const newcart = await cart.create({
                userId,
                items: [{
                    productId,
                    quantity
                }]
            })
            return res.status(200).json(newcart)
        }
        else {
            const itemindex = cartdata.items.findIndex(index => index.productId == productId)
            if (itemindex > -1) {
                let productadd = cartdata.items[itemindex]

                productadd.quantity += quantity
                cartdata.items[itemindex] = productadd
            }
            else {
                cartdata.items.push({
                    productId, quantity
                })
            }
            const addedcart = await cartdata.save()
            return res.status(200).json({ message: "added to cart", addedcart, success: true })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error:- can't add to cart" })
    }
}
export const editcart = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { reqquantity, reqproductId } = req.body
        let cartdata = await cart.findById({ userId: userId })
        // console.log(cartdata);
        const itemindex = cartdata.items.findIndex(index => index.productId == reqproductId)
        if (itemindex > -1) {
            let productedit = cartdata.items[itemindex]
            productedit.quantity = reqquantity
            cartdata.items[itemindex] = productedit
            await cart.updateOne({ userId: userId },
                productedit
            )
            let cartdata1 = await cart.findById({ userId: userId })

            return res.status(404).json({ message: "product edited successfully", cartdata1 })
        }
        else {
            return res.status(404).json({ message: "no product to edit" })
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error:- can't edit the cart" })
    }
}

export const deletecart = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.session.userId)
        const cartdata = await cart.findOne({ userId: userId })
        if (!cartdata) {
            return res.status(500).json({ message: " there cart is no cart found" })
        }
        const cartdel = await cart.deleteOne({ userId: userId })
        if (!cartdel) {
            return res.status(500).json({ message: "can't delete the cart" })
        }
        return res.status(500).json({ delketedcart: cartdata, message: "cart deleted successfully" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error:- while deleting the cart" })
    }
}
