import express from "express"
import order from "../models/order.js"
import cart from "../models/cart.js"
import product from '../models/product.js'

export const createorder = async (req, res) => {
    try {
        const userId = req.session.userId;
        const cartdata = await cart.findOne({ userId });

        if (!cartdata || !cartdata.items.length) {
            return res.status(404).json({ message: "No cart found or cart is empty" });
        }

        const products = await Promise.all(
            cartdata.items.map(i => product.findById(i.productId))
        );

        let orderItems = [];
        let totalAmount = 0;

        products.forEach((prod, index) => {
            const item = cartdata.items[index];
            if (!prod) return;

            const subTotal = prod.price * item.quantity;
            totalAmount += subTotal;

            orderItems.push({
                productId: prod._id,
                price: prod.price,
                quantity: item.quantity,
                subtotal: subTotal
            });

        });

        if (!orderItems.length) {
            return res.status(400).json({ message: "No valid products to place order" });
        }

        const orderdata = new order({
            userId,
            items: orderItems,
            total: totalAmount,
        });

        await orderdata.save();

        await cart.findOneAndDelete({ userId });

        return res.status(200).json({ message: "Order Placed", data: orderdata, success: true });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occurred while creating the order" });
    }
};


export const paymentStatus = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await order.findByIdAndUpdate(id, {
            paymentStatus: req.body.paymentStatus
        })
        if (data) {
            return res.status(200).json({ message: "Payment status updated successfully", data: data })
        }
        else {
            return res.status(404).json({ message: "Order not found" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "error :- can't change the status" })
    }
}


export const showOrder = async (req, res) => {
    try {
        const data = await order.findById({ _id: req.params.id })
        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "Order not found" })
        }
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({ message: "Internal server error" })
    }
}


export const cancelOrder = async (req, res) => {
    try {
        const data = await order.findByIdAndDelete({ _id: req.params.id })
        if (data) {
            return res.status(200).json({ message: "Order cancelled successfully" })
        }
        else {
            return res.status(404).json({ message: "Order not found" })
        }
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({ message: "Internal server error" })
    }
}