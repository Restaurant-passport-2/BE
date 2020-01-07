const validateLogin = require("./validateLogin");
const validateSignup = require("./validateSignup");
const internalError = require("./internalError");
const authenticator = require("./authenticator");
const signToken = require("./signToken");

module.exports = {
  validateLogin,
  validateSignup,
  internalError,
  authenticator,
  signToken,
};
