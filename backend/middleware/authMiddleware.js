 const jwt = require("jsonwebtoken");
 require("dotenv").config(); 

exports.authenticateToken  = (req, res, next) => {

    const token=req.cookies.token;
    if(!token)
    {
      return res.status(401).send("Access Denied ...no token Provided")
    }
    try{
      const decoded =jwt.verify(token,process.env.JWT_SECRET)
      console.log(decoded)
      req.user=decoded;
      next()
    }
    catch(err)
    {
      return res.status(401).send(err.message)
    }
}


