const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const authheader = req.headers["authorization"];
  if (!authheader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  const token = authheader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({msg: "Token is not valid"})};
    req.payload = payload;
    next();
  });
}

module.exports = auth;