const router = require("express").Router();
const passport = require("passport");
const { validateSignup, databaseError } = require("../middleware/middleware");
const userDB = require("../dbHelpers/Users");
const bcrypt = require("bcrypt");

router.post("/login", passport.authenticate("local"), function(req, res) {
  res.status(200).json({ userId: req.user.user_id });
});

router.post("/signup", validateSignup, function(req, res) {
  const user = ({ name, email, username, password, city, zipcode } = req.body);
  user.password = bcrypt.hashSync(user.password, Number(process.env.HASH_SALT_ROUNDS));

  userDB
    .insert(user)
    .then((user_id) => {
      res.status(201).json({ userId: user_id[0] });
    })
    .catch((err) => {
      // res.status(500).json(databaseError(err));
      res.status(500).json(err);
    });
});

router.get("/authenticated", function(req, res) {
  if (!req.user) {
    res.status(401).json();
  } else {
    res.status(200).json();
  }
});

router.get("/logout", function(req, res) {
  req.logout();
  res.status(200).json({ message: "Logged out!" });
});

module.exports = router;
