const validateLogin = require("./validateLogin");
const validateSignup = require("./validateSignup");
const databaseError = require("./databaseError");
const authenticator = require("./authenticator");
const signToken = require("./signToken");

module.exports = {
  validateLogin,
  validateSignup,
  databaseError,
  authenticator,
  signToken,
};
