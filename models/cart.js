import mongoose from 'mongoose'
const schema = mongoose.Schema;
const model = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        quantity: {
            type: Number,
            require: true,
        },
        productname: {
            type: String,
            require: true,
        },
        AddedAt: {
            type: Date,
            require: true,
            default: Date.now()
        }
    }
    ],
    createdAt: {
        type: Date,
        require: true,
        default: Date.now()
    }
})
const cart = mongoose.model("cart", model, "cart");
export default cart;