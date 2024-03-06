const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")

const regiterUser=async ( req,res )=>{

    const { username,email,password}=req.body;

    if (!username || !email || !password) {
        return res.status(401).json({
          error: "All Field are neccesary",
        });
      }

      const user=await UserModel.findOne({username:username})

      if(user){
        return res.status(401).json({
            error:"user already exist"
        })
      }

      const hashPassword=await bcrypt.hash(password,10);

      try {

        const newuser= new UserModel({
            username:username,
            email:email,
            password:hashPassword,
    
        })

        await newuser.save();
        return res.json({
            message: "User Registed successfully !!",
            newuser,
          });
        

        
      } catch (error) {
        console.log(error)
      }

}

const loginUser=async( req,res )=>{

  const { email,password}=req.body
  if(!email || !password){
    return res.json({
      error:"all field are required"
    })
  }

  const user= await UserModel.findOne({email:email})
  if(!user){
    return res.json({
      error:"User does no exists"
    })
  }

  const ispasswordMatch= await bcrypt.compare(password,user.password)

  if(!ispasswordMatch){
    return res.json({
      error:"Invalid Password"
    })
  }

  const token=jwt.sign({id:user._id},"secret")

  return res.json({
    token,
    user,
    userId:user.id
  })

}

const getSingleUser= async(req,res)=>{
  const { id } = req.params;

  const singleUser=await UserModel.findById(id);

  try {

    if(!singleUser){
      return res.json({
        error:"Connot find such user"
      })
    }
    if(singleUser){
      return res.json({
        message:"success",
        singleUser
      })
    }
    
  } catch (error) {
    return res.json({
      error:"something wrong"
    })
    
  }

}

module.exports={
    regiterUser,
    loginUser,
    getSingleUser
}