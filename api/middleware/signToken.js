const jwt = require("jsonwebtoken");

module.exports = function signToken(data) {
  let payload;
  !data.sub ? false : (payload = { ...data });

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "3h",
  };

  return jwt.sign(payload, secret, options);
};
