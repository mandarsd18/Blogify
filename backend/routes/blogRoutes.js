const express=require("express");
const { createBlogs, allblog, getSingleBlog, updateBlogs, deleteBlogs,myBlogs,getCatogary } = require("../controllers/blogController");

const router=express.Router()

router.post("/create-blog",createBlogs)
router.get("/allBlogs",allblog)
router.get("/:id",getSingleBlog)
router.patch("/update-blog/:id",updateBlogs);
router.delete("/delete-blog/:id",deleteBlogs);
router.get("/myblogs/:userID",myBlogs)
router.get("/category/:cat",getCatogary)

module.exports=router;