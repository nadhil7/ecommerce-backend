import mongoose from 'mongoose'
const schema = mongoose.Schema;
const model = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"user"
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"products"
        },
        quantity: {
            type: Number,
            require: true,
        },
        price: {
            type: Number,
            require: true
        },
        subtotal: {
            type: Number,
            required: true
        },
        AddedAt: {
            type: Date,
            require: true,
            default: Date.now()
        },
    }
    ],
    total: {
        type: Number,
        requried: true
    },
    paymentStatus: {
        type: String,
        requried: true
    },
    shippingStatus: {
        type: String,
        requried: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now()
    }
})
const order = mongoose.model("order", model, "order");
export default order;