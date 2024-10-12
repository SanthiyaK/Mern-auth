const express=require("express")
const router=express.Router()
const {authenticateToken}= require("../middleware/authMiddleware")
const {getAllProperty} =require("../controllers/propController")

router.get('/',authenticateToken, getAllProperty)

module.exports=router;