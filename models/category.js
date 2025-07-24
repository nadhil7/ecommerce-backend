import mongoose from 'mongoose'
const schema = mongoose.Schema;
const model = new schema({
    name: {
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true
    },
    CreatedAt: {
        type: Date,
        require: true,
        default: Date.now()
    }
})
const category = mongoose.model("category", model, "category");
export default category;