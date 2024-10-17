const express=require("express")
const router=express.Router()

const {register,loginUser, logoutUser,forgotpassword,resetPassword} =require("../controllers/authController")

router.post('/register',register)
router.post('/login',loginUser)
router.get('/logout', logoutUser);
router.post('/forgot', forgotpassword);
router.post('/reset/:token', resetPassword);
module.exports=router;