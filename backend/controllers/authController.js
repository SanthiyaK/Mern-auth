const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const { useResolvedPath } = require('react-router-dom');
require('dotenv').config();
// Register
exports.register=async(req,res)=>{

  const {email,password}=req.body;
  console.log(password)

  let passstr=password.toString();
  console.log(passstr)
  const hashpassword=await bcrypt.hash(passstr,10)
  console.log(hashpassword)
  const user=new User({email,password:hashpassword })
  await user.save();
  res.status(201).json({user,message:" Registration Successfull"})

/* catch(err){
  res.status(500).json({error: "Registration Failed"})
} */
}

exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(!user)
    {
      return res.status(401).json({error:"Authentication failed try again"})
    }
    let pass=password.toString()
    const passwordMatch=await bcrypt.compare(pass,user.password)
    if(!passwordMatch)
      {
        return res.status(401).json({error:"Authentication not matched"})
        
      }
      const token= jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'1h',})
      res.cookie("token",token,{httpOnly:true})
      .json({
        token,
        user
      })
}

exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  res.send({ success: true });
};