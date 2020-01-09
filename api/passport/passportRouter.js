const router = require("express").Router();
const Passport = require("../dbHelpers/Passport");
const { authenticator, validateEntry, internalError } = require("../middleware/middleware");

/**
 * @api {get} /passport Get user passport
 * @apiName GetPassport
 * @apiGroup Passport
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
  {
    "entries": [
      {
        "restaurant_id": 1,
        "name": "Crusty Crab",
        "street_address": "1146 Nagoya Way",
        "city": "San Pedro",
        "state": "CA",
        "zipcode": "90731",
        "phone_number": "(310) 519-9058",
        "website_url": "No website listed",
        "personal_rating": 4,
        "notes": "Some notes about this restaurant",
        "stamped": true
      }
    ]
  }
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
  Passport.find(req.token.sub)
    .then((passport) => {
      res.status(200).json(passport);
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
});

/**
 * @api {post} /passport/entry Create a passport entry
 * @apiName PostEntry
 * @apiGroup Passport
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
  {
    "entries": [
      {
        "restaurant_id": 1,
        "name": "Crusty Crab",
        "street_address": "1146 Nagoya Way",
        "city": "San Pedro",
        "state": "CA",
        "zipcode": "90731",
        "phone_number": "(310) 519-9058",
        "website_url": "No website listed",
        "personal_rating": 4,
        "notes": "Some notes about this restaurant",
        "stamped": true
      },
      {
        "restaurant_id": 2,
        "name": "A Restaurant Name",
        "street_address": "123 Road Dr",
        "city": "Ficticious City",
        "state": "Some State",
        "zipcode": "12345",
        "phone_number": "No phone number listed",
        "website_url": "No website listed",
        "personal_rating": 0,
        "notes": "Best chili dogs ever",
        "stamped": true
      }
    ]
  }
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
  const restaurant = ({
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

  restaurant.user_id = req.token.sub;

  Passport.insertEntry(req.token.sub, restaurant)
    .then((passport) => {
      res.status(201).json(passport);
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(409).json({ error: "Restaurant already exists in another entry" });
      } else {
        res.status(500).json(internalError(err));
      }
    });
});

/**
 * @api {put} /passport/entry/:id Edit passport entry
 * @apiName PutPassportEntry
 * @apiGroup Passport
 *
 * @apiParam {Integer} id restaurant id to delete.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
  {
    "entries": [
      {
        "restaurant_id": 1,
        "name": "Crusty Crab",
        "street_address": "1146 Nagoya Way",
        "city": "San Pedro",
        "state": "CA",
        "zipcode": "90731",
        "phone_number": "(310) 519-9058",
        "website_url": "No website listed",
        "personal_rating": 4,
        "notes": "Some notes about this restaurant",
        "stamped": true
      },
      {
        "restaurant_id": 2,
        "name": "A Restaurant Name",
        "street_address": "123 Road Dr",
        "city": "Ficticious City",
        "state": "Some State",
        "zipcode": "12345",
        "phone_number": "No phone number listed",
        "website_url": "No website listed",
        "personal_rating": 0,
        "notes": "Best chili dogs ever",
        "stamped": true
      }
    ]
  }
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
router.put("/entry/:restaurant_id", authenticator, function(req, res) {
  const possibleChanges = ({
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

  const changes = {};

  for (const item in possibleChanges) {
    if (item) {
      changes[item] = possibleChanges[item];
    }
  }

  Passport.updateEntry(req.token.sub, req.params.restaurant_id, changes)
    .then((passport) => {
      if (passport) {
        res.status(200).json(passport);
      } else {
        res.status(204).json();
      }
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
});

/**
 * @api {delete} /passport/entry/:id Delete passport entry
 * @apiName DeletePassportEntry
 * @apiGroup Passport
 *
 * @apiParam {Integer} id restaurant id to delete.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
  {
    "entries": [
      {
        "restaurant_id": 1,
        "name": "Crusty Crab",
        "street_address": "1146 Nagoya Way",
        "city": "San Pedro",
        "state": "CA",
        "zipcode": "90731",
        "phone_number": "(310) 519-9058",
        "website_url": "No website listed",
        "personal_rating": 4,
        "notes": "Some notes about this restaurant",
        "stamped": true
      },
      {
        "restaurant_id": 2,
        "name": "A Restaurant Name",
        "street_address": "123 Road Dr",
        "city": "Ficticious City",
        "state": "Some State",
        "zipcode": "12345",
        "phone_number": "No phone number listed",
        "website_url": "No website listed",
        "personal_rating": 0,
        "notes": "Best chili dogs ever",
        "stamped": true
      }
    ]
  }
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
router.delete("/entry/:restaurant_id", authenticator, function(req, res) {
  Passport.removeEntry(req.token.sub, req.params.restaurant_id)
    .then((passport) => {
      if (passport) {
        res.status(200).json(passport);
      } else {
        res.status(204).json();
      }
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
});

module.exports = router;
