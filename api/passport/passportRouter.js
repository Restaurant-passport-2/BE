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
 *      {
 *        "passport_entry_id": 4,
 *        "restaurant_id": 3,
 *        "city": "Santa Clarita",
 *        "personal_rating": 5,
 *        "notes": "abc",
 *        "stamped": false,
 *        "restaurant": {
 *          "name": "Tomato Joe's Pizza Express",
 *          "street_address": "121233 McBean Pkwy",
 *          "city": "Santa Clarita",
 *          "state": "CA",
 *          "zipcode": "91350",
 *          "phone_number": "No phone number listed",
 *          "website_url": "No website listed"
 *        }
 *      }
 *      ... { more entries if available}
 *    ]
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
 *      "error": "Server error"
 *    }
 */
router.get("/", authenticator, function(req, res) {
  passport
    .find(req.token.sub)
    .then((passportData) => {
      if (passportData.entries) {
        res.status(200).json({ entries: passportData.entries });
      } else {
        res.status(200).json({ entries: [] });
      }
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
 *      {
 *        "passport_entry_id": 4,
 *        "restaurant_id": 3,
 *        "city": "Santa Clarita",
 *        "personal_rating": 5,
 *        "notes": "abc",
 *        "stamped": false,
 *        "restaurant": {
 *          "name": "Tomato Joe's Pizza Express",
 *          "street_address": "121233 McBean Pkwy",
 *          "city": "Santa Clarita",
 *          "state": "CA",
 *          "zipcode": "91350",
 *          "phone_number": "No phone number listed",
 *          "website_url": "No website listed"
 *        }
 *      }
 *      ... { more entries if available}
 *    ]
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
 *       "error": "Restaurant already exists in another entry"
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
          res.status(201).json({ entries: updatedPassport.entries });
        })
        .catch((err) => {
          res.status(500).json(internalError(err));
        });
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(409).json({ error: "Restaurant already exists in another entry" });
      } else {
        res.status(500).json(internalError(err));
      }
    });
});

router.put("/entry/:entry_id", authenticator, function(req, res) {
  res.status(200).json(req.params.entry_id);
});

/**
 * @api {delete} /passport/entry/:id Delete passport entry
 * @apiName DeletePassportEntry
 * @apiGroup Passport
 *
 * @apiParam {Integer} id passport entry id to delete.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *  "entries": [
 *      {
 *        "passport_entry_id": 4,
 *        "restaurant_id": 3,
 *        "city": "Santa Clarita",
 *        "personal_rating": 5,
 *        "notes": "abc",
 *        "stamped": false,
 *        "restaurant": {
 *          "name": "Tomato Joe's Pizza Express",
 *          "street_address": "121233 McBean Pkwy",
 *          "city": "Santa Clarita",
 *          "state": "CA",
 *          "zipcode": "91350",
 *          "phone_number": "No phone number listed",
 *          "website_url": "No website listed"
 *        }
 *      }
 *      ... { more entries if available}
 *    ]
 * }
 *
 * @apiError (401 Unauthorized) {json} Unauthorized Missing or invalid token in authorization header.
 *
 * @apiErrorExample {json} 401 Error-Response
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": "Token invalid"
 *    }
 * @apiError (404 NotFound) {json} Entry doesn't exist.
 *
 * @apiErrorExample {json} 404 Error-Response
 *    HTTP/1.1 404 NotFound
 *    {
 *      "error": "Resource not found"
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
router.delete("/entry/:entry_id", authenticator, function(req, res) {
  passport.entry
    .remove(req.token.sub, req.params.entry_id)
    .then((result) => {
      if (result > 0) {
        passport
          .find(req.token.sub)
          .then((passportData) => {
            if (passportData.entries) {
              res.status(200).json({ entries: passportData.entries });
            } else {
              res.status(200).json({ entries: [] });
            }
          })
          .catch((err) => {
            res.status(500).json(internalError(err));
          });
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
});

module.exports = router;
