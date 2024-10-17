const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
  
    email: { type: String, required: true, unique: true},
    password: {
        type: String,
        required: true
    },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
    createdAt :{
        type: Date,
        default: Date.now
    }
})

 const User=mongoose.model("USER",userSchema)
 module.exports=User;