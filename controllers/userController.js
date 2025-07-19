import express from "express";
import user from '../models/user.js'
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';


export const signup = async (req, res) => {
    try {
        const { name, email, password, phone } =await req.body
        const salt = 10;
        const hashedpass = await bcrypt.hash(password, salt);
        const data = new user({
            name, 
            email, 
            password: hashedpass,
            phone,
            image:req.filename
        })
        await data.save();
        return res.json({message:"user created",
            type:"success"
        })
    }
    catch (err) {
        res.json({message:"error occured!"});
        console.log(err);
    }
} 
export const useredit =async(req,res)=>{
    try{
        const userdata = await user.findById(req.params.id) 
        return res.json({
            name:userdata.name,
            email:userdata.email,
            phone:userdata.phone,
            password:""
        })
    }
    catch(err)
    {
        return res.status(404).json({err})
        console.log(err);
    }
}
// export const editsave = async (req,res)=>{
//     const userid =req.params.id
//     try
//     {
//         const {name,email,password,phone} = req.body
//         await user.findByIdAndUpdate({userid},{
//             name,
//             email,
//             password,
//             phone,
//             image:req.filename
//         })
//     }
//     catch(err)
//     {
//         console.log(err);
        
//     }
// }