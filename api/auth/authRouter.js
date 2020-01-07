const router = require("express").Router();
const userDB = require("../dbHelpers/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignup, databaseError } = require("../middleware/middleware");

router.post("/login", function(req, res) {
  const { username, password } = req.body;
  if (username && password) {
  }
});

router.post("/signup", validateSignup, function(req, res) {
  const user = ({ name, email, username, password, city, zipcode } = req.body);
  bcrypt
    .hash(user.password, Number(process.env.HASH_SALT_ROUNDS))
    .then((hash) => {
      userDB
        .insert(user)
        .then((user_id) => {
          res.status(201).json({ userId: user_id[0] });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error generating hash", error: error });
    });
});

router.get("/authenticated", function(req, res) {});

module.exports = router;
