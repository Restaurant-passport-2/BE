const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {
    const secret = process.env.JWT_SECRET;
    jwt.verify(authorization, secret, function(error, decodedToken) {
      if (error) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "User must be logged in to access this resource" });
  }
};
