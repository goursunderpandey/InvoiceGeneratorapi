const jwt = require("jsonwebtoken");
const JWT_SECRET = "MY_SECRET_KEY"; 

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");



  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
   // console.log(decoded);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
