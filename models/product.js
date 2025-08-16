import mongoose from 'mongoose'
const schema = mongoose.Schema;
const model = new schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    discription: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"categories"
    },
    categoryname: {
        type: String,
        require: true
    }
})
const product = mongoose.model("products", model);
export default product;