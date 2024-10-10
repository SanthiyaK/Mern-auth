const express=require("express")
const router=express.Router()
const { authenticateToken } = require('../middleware/authMiddleware');
const {getAllProperty,getSingleProperty,postProperty} =require("../controllers/propController")

router.get('/',authenticateToken, getAllProperty)
router.get('/:id',authenticateToken, getSingleProperty)
router.post('/',authenticateToken, postProperty)
module.exports=router;