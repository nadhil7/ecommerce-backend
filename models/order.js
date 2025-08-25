import mongoose from 'mongoose'
const schema = mongoose.Schema;
const model = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "user"
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "products"
        },
         productname: {
            type: String,
            require: true,
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
        requried: true,
        default:"pending"
    },
    shippingStatus: {
        type: String,
        requried: true,
        default:"preparing to ship"
    },
    createdAt: {
        type: Date,
        require: true,
        default: () => {
            const d = new Date();
            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        }

    }
})
const order = mongoose.model("order", model, "order");
export default order;