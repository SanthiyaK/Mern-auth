const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt=require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { useResolvedPath } = require('react-router-dom');
require('dotenv').config();
// Register
exports.register=async(req,res)=>{

  const {email,password}=req.body;
  let passstr=password.toString();
  const hashpassword=await bcrypt.hash(passstr,10)
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

exports.forgotpassword=async (req, res) => {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a token
        const token = crypto.randomBytes(32).toString('hex');
        const resetToken=crypto.createHash('sha256').update(token).digest('hex');
        // Set token and expiration in the database
        user.resetToken = resetToken;
        console.log(resetToken)
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await user.save();

        // Create reset link
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
    });

// Send email
await transporter.sendMail({
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: 'Password Reset',
    html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
});

res.status(200).json({ message: 'Password reset link sent to your email.' });
};
  






 exports.resetPassword= async (req, res) => {
          const { token } = req.params;
          const { password } = req.body;

          // Find user by token and check expiration
          const user = await User.findOne({
              resetToken: token,
              resetTokenExpiration: { $gt: Date.now() },
          });

          if (!user) {
              return res.status(400).json({ message: 'Invalid or expired token' });
          }
          const resetPass=await bcrypt.hash(password, 10);;
                
          // Update the password and clear the token
          user.password = resetPass; // You should hash the password before saving
          user.resetToken = undefined;
          user.resetTokenExpiration = undefined;
          await user.save();

          res.status(200).json({ message: 'Password has been reset successfully.' });
}