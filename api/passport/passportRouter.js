const router = require("express").Router();
const passport = require("../dbHelpers/Passport");
const { authenticator, validateEntry, internalError } = require("../middleware/middleware");

/**
 * @api {get} /passport User passport
 * @apiName GetPassport
 * @apiGroup Passport
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *  "entries": [
 *    {
 *      "passport_entry_id": 1,
 *      "passport_id": 1,
 *      "restaurant_id": 1,
 *      "city": "Santa Clarita",
 *      "personal_rating": 5,
 *      "notes": "Enjoyed the atmosphere and dining experience. Pizza was great.",
 *      "stamped": true
 *    }
 *    ... { more entries }
 *  ]
 * }
 *
 * @apiError (401 Unauthorized) {json} Unauthorized Missing or invalid token in authorization header.
 *
 * @apiErrorExample {json} 401 Error-Response
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": "Token invalid"
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
router.get("/", authenticator, function(req, res) {
  passport
    .find(req.token.sub)
    .then((passportData) => {
      res.status(200).json({ entries: passportData.entries });
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
});

/**
 * @api {post} /passport/entry Create passport entry
 * @apiName PostEntry
 * @apiGroup PassportEntry
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *  "entries": [
 *    {
 *      "passport_entry_id": 1,
 *      "passport_id": 1,
 *      "restaurant_id": 1,
 *      "city": "Santa Clarita",
 *      "personal_rating": 5,
 *      "notes": "Enjoyed the atmosphere and dining experience. Pizza was great.",
 *      "stamped": true
 *    }
 *  ]
 * }
 *+
 * @apiError (401 Unauthorized) {json} Unauthorized Missing or invalid token in authorization header.
 *
 * @apiErrorExample {json} 401 Error-Response
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": "Token invalid"
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
router.post("/entry", authenticator, validateEntry, function(req, res) {
  const entry = ({
    name,
    street_address,
    city,
    state,
    zipcode,
    phone_number,
    website_url,
    personal_rating,
    notes,
    stamped,
  } = req.body);

  //Set passport id from user token
  entry.passport_id = req.token.ppid;

  passport.entry
    .insert(entry)
    .then(() => {
      passport
        .find(req.token.sub)
        .then((updatedPassport) => {
          res.status(201).json(updatedPassport);
        })
        .catch((err) => {
          res.status(500).json(internalError(err));
        });
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(409).json({ message: "Restaurant already exists in another entry" });
      } else {
        res.status(500).json(internalError(err));
      }
    });
});

module.exports = router;
