import express from "express"
import order from "../models/order.js"
import cart from "../models/cart.js"
import product from '../models/product.js'

export const createorder = async (req, res) => {
    try {
        const userId = req.session.userId
        const cartdata = await cart.findOne({ userId: userId })
        if (!cartdata) {
            return res.status(404).json({ message: "no cart found to place order" })
        }
        else {
            let orderItem = []
            let totalAmount = 0;
            for (const i of cartdata.items) {
                const product = await cart.findById(i.productId);
                if (!product) continue

                const subTotal = product.price * i.quantity
                totalAmount += subTotal

                orderItem.push({
                    productId: product._id,
                    price: product.price,
                    quantity: i.quantity,
                    subTotal: subTotal,
                })
            }
            const orderdata = new order({
                userId: userId,
                items: orderItem,
                total: totalAmount,
            })
            await orderdata.save()

            await cart.findOneAndDelete({ userId: userId })

            return res.status(200).json({ message: "Order Placed ", data: orderdata })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error ocuured while creating the order" })
    }
}

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