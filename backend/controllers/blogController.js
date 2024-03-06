const express = require("express");
const BlogModel = require("../models/blogModel");

const createBlogs = async (req, res) => {
  const { title, description, owner, image, category } = req.body;

  if (!title || !description || !owner || !category) {
    return res.status(401).json({
      message: "Fill all field",
    });
  }
  try {
    const newBlog = new BlogModel({
      title: title,
      description: description,
      owner: owner,
      image: image,
      category: category,
    });
    await newBlog.save();
    return res.status(200).json({
      success: true,
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

const allblog = async (req, res) => {
  const allblog = await BlogModel.find({}).sort({ createdAt: -1 });
  const count=allblog.length;

  return res.json({
    
allblog,
  });
};

const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  const singleBlog = await BlogModel.findById(id);

  try {
    if (!singleBlog) {
      return res.json({
        error: "Blog does not exists",
      });
    }
    if (singleBlog) {
      return res.json({
        message: "success",
        singleBlog,
      });
    }
  } catch (error) {
    return res.json({
      error: "Something missing",
    });
  }
};

const updateBlogs = async (req, res) => {
  const { id } = req.params;

  const isBlogExist = await BlogModel.findById(id);
  if (!isBlogExist) {
    return res.json({
      error: "Blog does not exist!",
    });
  }

  const updateBlog=await BlogModel.findByIdAndUpdate({_id:id},{...req.body},{new:true})

  if(!updateBlog){
    return res.json({
      error:"NO such blog"
    })
  }else{
    return res.json({
      updateBlog
    })
  }
};

const deleteBlogs= async(req,res)=>{
  const { id } = req.params;

  const isBlogExist = await BlogModel.findById(id);
  if (!isBlogExist) {
    return res.json({
      error: "Blog does not exist!",
    });
  }

  const deleteblog=await BlogModel.findOneAndDelete({_id:id});

  if(!deleteblog){
    return res.json({
      error:"Something went wrong"
    })
  }else{
    return res.json({
      message:"blog deleted successfully"
    })
  }

}

const myBlogs=async(req,res)=>{
  const { userID }=req.params
  const myblogs=await BlogModel.find({owner:userID})
  res.status(201).json({
    success: true,
    message: 'My blogs ',
    myblogs

})

}
const getCatogary=async(req,res)=>{
  const { cat }=req.params

  const myblogs=await BlogModel.find({category:cat})
  res.status(201).json({
    success: true,
    message: 'category',
    myblogs

})

  

}

module.exports = {
  createBlogs,
  allblog,
  getSingleBlog,
  updateBlogs,
  deleteBlogs,
  myBlogs,
  getCatogary

};
