const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const userDB = require("../../api/dbHelpers/Users");
const bcrypt = require("bcrypt");

passport.use(
  new Strategy(function(username, password, cb) {
    userDB
      .findByUsername(username)
      .then((user) => {
        if (!user) {
          return cb(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return cb(null, false);
        }
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  })
);
