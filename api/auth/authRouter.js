const router = require("express").Router();
const userDB = require("../dbHelpers/Users");
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
 *    {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *    }
 *
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
 *    {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *    }
 *
 * @apiError (400 Bad Request) {json} BadRequest Missing a required parameter for registration.
 *
 * @apiErrorExample {json} 400 Error-Response
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "message": "Please provide name, email, username, password, city, and zipcode"
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
          res.status(500).json(internalError(err));
        });
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
});

module.exports = router;
