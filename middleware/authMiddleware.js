const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expect: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "🚫 Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "❌ Invalid or expired token." });
    }
    req.user = decoded;
    next();
  });
};

module.exports = protect;
