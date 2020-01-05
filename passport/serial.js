const passport = require("passport");
const userDB = require("../api/dbHelpers/Users");
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  userDB
    .find(id)
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
});
