const router = require("express").Router();
const bcrypt = require("bcrypt");
const { validateLogin, validateSignup, internalError, signToken } = require("../middleware/middleware");
const User = require("../dbHelpers/User");
const Passport = require("../dbHelpers/Passport");

/**
 * @api {post} /auth/login User login
 * @apiName PostLogin
 * @apiGroup Auth
 *
 * @apiParam {String} username Valid username associated with an account.
 * @apiParam {String} password Valid password associated with an account.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *   "user": {
 *   "name": "demo",
 *   "username": "demo",
 *   "email": "demo@email.com",
 *   "city": "Demo City",
 *   "zipcode": "12345",
 *   "passport": [
 *      {
 *        "restaurant_id": 1,
 *        "name": Pizza Barn,
 *        "street_address": "123 Road Dr",
 *        "city": "Santa Clarita",
 *        "state": "CA",
 *        "zipcode": "91350",
 *        "personal_rating": 5,
 *        "notes": "Enjoyed the atmosphere and dining experience. Pizza was great.",
 *        "stamped": true
 *      }
 *   ]
 * },
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTU3ODQxNTg2NSwiZXhwIjoxNTc4NDI2NjY1fQ.3UN6bXm0lMXl5YvqSp-wBDzF41YSyGI7dfkTntUvu7M"
 * }
 *
 * @apiError (400 Bad Request) {json} BadRequest Missing username or password parameters in request.
 *
 * @apiErrorExample {json} 400 Error-Response
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Please provide username & password to login"
 *    }
 *
 * @apiError (401 Unauthorized) {json} Unauthorized The username/password combination was invalid.
 *
 * @apiErrorExample {json} 401 Error-Response
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": "Invalid username/password combination"
 *    }
 * @apiError (500 Internal Server Error) {json} InternalServerError Server side error.
 *
 * @apiErrorExample {json} 500 Error-Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": "Server error"
 *    }
 */
router.post("/login", validateLogin, function(req, res) {
  const { username, password } = req.user;

  //Find user
  User.findByUsername(username)
    .then((user) => {
      if (user) {
        //Check password
        bcrypt
          .compare(password, user.password)
          .then((isAuthenticated) => {
            if (isAuthenticated) {
              //Get user passport
              Passport.find(user.user_id)
                .then((passport) => {
                  //Generate auth token
                  const token = signToken({ sub: user.user_id });

                  //Return user info + passport & token
                  res.status(200).json({
                    user: {
                      name: user.name,
                      username: user.username,
                      email: user.email,
                      city: user.city,
                      zipcode: user.zipcode,
                      passport: passport.entries,
                    },
                    token: token,
                  });
                })
                .catch((err) => {
                  res.status(500).json(internalError(err));
                });
            } else {
              res.status(401).json({ error: "Invalid username/password combination" });
            }
          })
          .catch((err) => {
            res.status(500).json(internalError(err));
          });
      } else {
        res.status(401).json({ error: "Invalid username/password combination" });
      }
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
});

/**
 * @api {post} /auth/signup User signup
 * @apiName PostSignup
 * @apiGroup Auth
 *
 * @apiParam {String} name User's full name.
 * @apiParam {String} email User's email.
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 * @apiParam {String} city User's city.
 * @apiParam {String} zipcode User's zipcode.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *   "user": {
 *   "name": "demo",
 *   "username": "demo",
 *   "email": "demo@email.com",
 *   "city": "Demo City",
 *   "zipcode": "12345",
 *   "passport": []
 * },
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTU3ODQxNTg2NSwiZXhwIjoxNTc4NDI2NjY1fQ.3UN6bXm0lMXl5YvqSp-wBDzF41YSyGI7dfkTntUvu7M"
 * }
 *
 * @apiError (400 Bad Request) {json} BadRequest Missing a required parameter for registration.
 *
 * @apiErrorExample {json} 400 Error-Response
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Please provide name, email, username, password, city, and zipcode"
 *    }
 * @apiError (409 Conflict) {json} Conflict Account already exists.
 *
 * @apiErrorExample {json} 409 Error-Response
 *    HTTP/1.1 409 Conflict
 *    {
 *      "error": "Account already exists"
 *    }
 *
 * @apiError (500 Internal Server Error) {json} InternalServerError Server side error.
 *
 * @apiErrorExample {json} 500 Error-Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": "Server error"
 *    }
 */
router.post("/signup", validateSignup, function(req, res) {
  //Get required info from request
  const userInfo = ({ name, email, username, password, city, zipcode } = req.user);

  //Hash password before inserting user into database.
  bcrypt
    .hash(userInfo.password, Number(process.env.HASH_SALT_ROUNDS))
    .then((hash) => {
      userInfo.password = hash; //Update user object with hashed password.

      //Add user to database.
      User.insert(userInfo)
        .then((user_id) => {
          user_id = user_id[0]; //Get rid of 1 index array

          //Generate a login token so we don't have to login after registering.
          const token = signToken({ sub: user_id });

          //Return user info and auth token
          res.status(200).json({
            user: {
              name: userInfo.name,
              username: userInfo.username,
              email: userInfo.email,
              city: userInfo.city,
              zipcode: userInfo.zipcode,
              passport: [],
            },
            token: token,
          });
        })
        .catch((err) => {
          if (err.code === "23505") {
            res.status(409).json({ error: "Account already exists" });
          } else {
            res.status(500).json(internalError(err));
          }
        });
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
});

module.exports = router;
