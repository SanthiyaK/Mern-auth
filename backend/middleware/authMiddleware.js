const jwt = require("jsonwebtoken");
 require("dotenv").config();

exports.authenticateToken  = (req, res, next) => {
  // Read the token from the cookie
  const token = req.cookies.token;
  if (!token)
    return res.status(401).send("Access denied...No token provided...");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (er) {
    // console.log("err", er);
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("token");
    return res.status(400).send(er.message);
  }
};


/* // Middleware to check for admin role
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  }; */