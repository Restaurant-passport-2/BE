const router = require("express").Router();
const passport = require("../dbHelpers/Passport");
const { authenticator, validateEntry, internalError } = require("../middleware/middleware");

/**
 * @api {get} /passport Get user passport
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
 *      "stamped": true,
 *      "restaurant": {
 *        "restaurant_id": 1,
 *        "name": "Chi Chi's Pizza",
 *         "street_address": "23043 Soledad Canyon Rd",
 *        "city": "Santa Clarita",
 *        "state": "CA",
 *        "zipcode": "91350",
 *        "phone_number": "(661) 259-4040",
 *        "website_url": "No website listed",
 *        "public_rating": 0
 *      },
 *    ... { more entries if they exist }
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
 * @api {post} /passport/entry Create a passport entry
 * @apiName PostEntry
 * @apiGroup PassportEntry
 *
 * @apiParam {String} name Name of restaurant.
 * @apiParam {String} street_address Street address.
 * @apiParam {String} city City name.
 * @apiParam {String} state State (2 Char abrev): CA, NV, AZ, etc.
 * @apiParam {String} zipcode Restaurant zipcode.
 * @apiParam {String} [phone_number] Business phone number.
 * @apiParam {String} [website_url] Restaurant's website.
 * @apiParam {Boolean} [stamped] Whether you have been there or not.
 * @apiParam {Integer} [personal_rating] Rating between 1-5.
 * @apiParam {String} notes Notes about the restaurant.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 OK
 * {
 *  "entries": [
 *    {
 *      "passport_entry_id": 1,
 *      "passport_id": 1,
 *      "restaurant_id": 1,
 *      "city": "Santa Clarita",
 *      "personal_rating": 5,
 *      "notes": "Enjoyed the atmosphere and dining experience. Pizza was great.",
 *      "stamped": true,
 *      "restaurant": {
 *        "restaurant_id": 1,
 *        "name": "Chi Chi's Pizza",
 *         "street_address": "23043 Soledad Canyon Rd",
 *        "city": "Santa Clarita",
 *        "state": "CA",
 *        "zipcode": "91350",
 *        "phone_number": "(661) 259-4040",
 *        "website_url": "No website listed",
 *        "public_rating": 0
 *      },
 *    ... { more entries if they exist }
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
 * @apiError (409 Conflict) {json} Conflict Resource already exists
 *
 * @apiErrorExample {json} 409 Error-Response
 *    HTTP/1.1 401 Conflict
 *    {
 *       "message": "Restaurant already exists in another entry"
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

router.put("/entry/:entry_id", authenticator, function(req, res) {
  res.status(200).json(req.params.entry_id);
});

router.delete("/entry/:entry_id", authenticator, function(req, res) {
  passport.entry
    .remove(req.token.sub, req.params.entry_id)
    .then((result) => {
      if (result > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Resource not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
});

module.exports = router;
