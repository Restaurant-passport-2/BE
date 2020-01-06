const passport = require("passport");
const userDB = require("../api/dbHelpers/Users");
passport.serializeUser(function(user, cb) {
  cb(null, user.user_id);
});

passport.deserializeUser(function(user_id, cb) {
  userDB
    .find(user_id)
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
});
