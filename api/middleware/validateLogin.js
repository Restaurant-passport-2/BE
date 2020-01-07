module.exports = function validateLogin(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    req.user = { username, password };
    next();
  } else {
    res.status(400).json({ message: "Please provide username & password to login" });
  }
};
