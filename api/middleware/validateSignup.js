module.exports = function validateSignup(req, res, next) {
  const { email, username, password, city, zipcode } = req.body;

  if (email && username && password && city && zipcode) {
    next();
  } else {
    res.status(400).json({ message: "Please provide email, username, password, city, and zipcode" });
  }
};
