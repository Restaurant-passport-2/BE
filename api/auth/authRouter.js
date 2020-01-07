const router = require("express").Router();
const { validateSignup, databaseError } = require("../middleware/middleware");
const userDB = require("../dbHelpers/Users");
const bcrypt = require("bcrypt");

router.post("/login", function(req, res) {
  const { username, password } = req.body;
  if (username && password) {
  }
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
      res.status(500).json(err);
    });
});

router.get("/authenticated", function(req, res) {});

module.exports = router;
