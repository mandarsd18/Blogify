const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose")
const userRoute=require("./routes/userRoutes")
const blogRoute=require("./routes/blogRoutes")

require("dotenv").config()

const app=express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next)=>{next()})

app.get("/",(req,res)=>{
    res.send({message:"Hello World"})
})

app.use("/auth/user",userRoute)
app.use("/blogs",blogRoute)

mongoose.connect("mongodb+srv://mandardeshmukh1811:mongodb@cluster0.rvavgxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Database is connected")
    app.listen(process.env.PORT,()=>{
        console.log(`listening on port ${process.env.PORT}`);
    })

}).catch((err)=>{
    console.log("unable to connect " ,err)
})