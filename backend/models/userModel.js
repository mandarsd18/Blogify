const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
   

},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)
