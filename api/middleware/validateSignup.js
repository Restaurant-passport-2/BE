module.exports = function validateSignup(req, res, next) {
  const { name, email, username, password, city, zipcode } = req.body;

  if (name && email && username && password && city && zipcode) {
    next();
  } else {
    res.status(400).json({ message: "Please provide name, email, username, password, city, and zipcode" });
  }
};
