const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please add a Title"]
    },
    description:{
        type:String,
        required:[true,"Please add a Description"]
    },
    image:{
        type:String,
        default:"https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg"
    },
    category:{
        type:String,
        default:"All"
    },
    owner:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Blog",blogSchema);