import mongoose from 'mongoose'
const schema = mongoose.Schema;
const model = new schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})
const product = mongoose.model("products",model);
export default product;