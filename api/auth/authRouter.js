const router = require("express").Router();
const userDB = require("../dbHelpers/Users");
const bcrypt = require("bcrypt");
const { validateLogin, validateSignup, databaseError, signToken } = require("../middleware/middleware");

router.post("/login", validateLogin, function(req, res) {
  const { username, password } = req.user;

  userDB
    .findByUsername(username)
    .then((user) => {
      if (user) {
        //Securely compare pass with user pass hash.
        bcrypt
          .compare(password, user.password)
          .then((isAuthenticated) => {
            //Generate token on successful login.
            if (isAuthenticated) {
              const token = signToken({ sub: user.user_id });
              res.status(200).json({ token: token });
            } else {
              res.status(401).json({ message: "Invalid username/password combination" });
            }
          })
          .catch((err) => {
            res.status(500).json({ message: "Error logging in user" });
          });
      } else {
        res.status(401).json({ message: "Invalid username/password combination" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error getting user from database" });
    });
});

router.post("/signup", validateSignup, function(req, res) {
  //Create a user object with data from request body.
  const user = ({ name, email, username, password, city, zipcode } = req.user);

  //Hash password before creating user in database.
  bcrypt
    .hash(user.password, Number(process.env.HASH_SALT_ROUNDS))
    .then((hash) => {
      user.password = hash; //Update user object with hashed password.

      //Add user to database.
      userDB
        .insert(user)
        .then((user_id) => {
          //Return a login token so we don't have to login after registering.
          const token = signToken({ sub: user_id[0] });
          res.status(200).json({ token: token });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error generating hash", error: error });
    });
});

module.exports = router;
