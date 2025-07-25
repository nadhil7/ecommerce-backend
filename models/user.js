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
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    },
    image:{
        type:String,
        require:true
    }
})
const user = mongoose.model("user",model,"users");
export default user;