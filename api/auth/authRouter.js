const router = require("express").Router();
const userDB = require("../dbHelpers/Users");
const passport = require("../dbHelpers/Passport");
const bcrypt = require("bcrypt");
const { validateLogin, validateSignup, internalError, signToken } = require("../middleware/middleware");

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
 *        "passport_entry_id": 1,
 *        "passport_id": 1,
 *        "restaurant_id": 1,
 *        "city": "Santa Clarita",
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
 *      "message": "Please provide username & password to login"
 *    }
 *
 * @apiError (401 Unauthorized) {json} Unauthorized The username/password combination was invalid.
 *
 * @apiErrorExample {json} 401 Error-Response
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "message": "Invalid username/password combination"
 *    }
 * @apiError (500 Internal Server Error) {json} InternalServerError Server side error.
 *
 * @apiErrorExample {json} 500 Error-Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Server error"
 *    }
 */
router.post("/login", validateLogin, function(req, res) {
  const { username, password } = req.user;

  //Find user
  userDB
    .findByUsername(username)
    .then((foundUser) => {
      if (foundUser) {
        //Check password
        bcrypt
          .compare(password, foundUser.password)
          .then((isAuthenticated) => {
            if (isAuthenticated) {
              //Get user passport
              passport
                .find(foundUser.user_id)
                .then((userPassport) => {
                  //Generate auth token
                  const token = signToken({ sub: foundUser.user_id, ppid: userPassport.ppid });

                  //Return user info + passport & token
                  res.status(200).json({
                    user: {
                      name: foundUser.name,
                      username: foundUser.username,
                      email: foundUser.email,
                      city: foundUser.city,
                      zipcode: foundUser.zipcode,
                      passport: userPassport.entries,
                    },
                    token: token,
                  });
                })
                .catch((err) => {
                  res.status(500).json(internalError(err));
                });
            } else {
              res.status(401).json({ message: "Invalid username/password combination" });
            }
          })
          .catch((err) => {
            res.status(500).json(internalError(err));
          });
      } else {
        res.status(401).json({ message: "Invalid username/password combination" });
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
 *   "zipcode": "12345"
 * },
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTU3ODQxNTg2NSwiZXhwIjoxNTc4NDI2NjY1fQ.3UN6bXm0lMXl5YvqSp-wBDzF41YSyGI7dfkTntUvu7M"
 * }
 *
 * @apiError (400 Bad Request) {json} BadRequest Missing a required parameter for registration.
 *
 * @apiErrorExample {json} 400 Error-Response
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "message": "Please provide name, email, username, password, city, and zipcode"
 *    }
 * @apiError (409 Conflict) {json} Conflict Account already exists.
 *
 * @apiErrorExample {json} 409 Error-Response
 *    HTTP/1.1 409 Conflict
 *    {
 *      "message": "Account already exists"
 *    }
 *
 * @apiError (500 Internal Server Error) {json} InternalServerError Server side error.
 *
 * @apiErrorExample {json} 500 Error-Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Server error"
 *    }
 */
router.post("/signup", validateSignup, function(req, res) {
  const user = ({ name, email, username, password, city, zipcode } = req.user);

  //Hash password before inserting user into database.
  bcrypt
    .hash(user.password, Number(process.env.HASH_SALT_ROUNDS))
    .then((hash) => {
      user.password = hash; //Update user object with hashed password.

      //Add user to database.
      userDB
        .insert(user)
        .then((user_id) => {
          //User has been added, lets make them a passport now.
          passport
            .insert({ user_id: user_id[0] })
            .then((passport_id) => {
              //Generate a login token so we don't have to login after registering.
              const token = signToken({ sub: user_id[0], ppid: passport_id[0] });

              //Return user info and auth token
              res.status(200).json({
                user: {
                  passport: passport_id[0],
                  name: user.name,
                  username: user.username,
                  email: user.email,
                  city: user.city,
                  zipcode: user.zipcode,
                },
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json(internalError(err));
            });
        })
        .catch((err) => {
          if (err.code === "23505") {
            res.status(409).json({ message: "Account already exists" });
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
