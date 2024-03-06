const express=require("express")
const { regiterUser,loginUser, getSingleUser }=require("../controllers/userController")

const router=express.Router()

router.post("/register",regiterUser);
router.post("/login",loginUser);
router.get("/:id",getSingleUser);

module.exports=router;