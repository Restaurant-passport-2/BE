const router = require("express").Router();
const axios = require("axios");
const { authenticator, searchBuilder, internalError } = require("../middleware/middleware");

/**
 * @api {get} /restaurants/search Search for restaurants
 * @apiName GetSearch
 * @apiGroup Restaurants
 *
 * @apiParam {String} [location] "city, state" or "city, zipcode".
 * @apiParam {String} [term] Search term, for example "food" or "restaurants". The term may also be business names, such as "Starbucks".
 * @apiParam {String} [categories] Categories to filter the search results with..
 * @apiParam {String} [price] Pricing levels to filter the search result with: 1 = $, 2 = $$, 3 = $$$, 4 = $$$$. The price filter can be a list of comma delimited pricing levels. For example, "1, 2, 3" will filter the results to show the ones that are $, $$, or $$$.
 * @apiParam {Boolean} [open_now] Default to false. When set to true, only return the businesses open now.
 * @apiParam {String} [sort_by] Suggestion to the search algorithm that the results be sorted by one of the these modes: best_match, rating, review_count or distance. The default is best_match.
 * @apiParam {Integer} [limit] Number of business results to return. By default, it will return 20. Maximum is 50.
 * @apiParam {Integer} [offset] Offset the list of returned business results by this amount.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "businesses": [
 *        {
 *          "name": "Larsen's Steakhouse - Valencia",
 *          "url": "https://www.yelp.com/biz/larsens-steakhouse-valencia-valencia?adjust_creative=V39ZouXZhFWakYvJzmT8QQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=V39ZouXZhFWakYvJzmT8QQ",
 *          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/JukjDzIcdbJ6iuLKyuLltg/o.jpg",
 *          "is_closed": false,
 *          "price": "$$$$",
 *          "rating": 4,
 *          "review_count": 555,
 *          "categories": [
 *            {
 *              "alias": "steak",
 *              "title": "Steakhouses"
 *            },
 *            {
 *              "alias": "seafood",
 *              "title": "Seafood"
 *            },
 *            {
 *              "alias": "newamerican",
 *              "title": "American (New)"
 *            }
 *          ],
 *          "coordinates": {
 *            "latitude": 34.41728,
 *            "longitude": -118.56143
 *          },
 *          "location": {
 *            "address1": "24320 Town Center Dr",
 *            "address2": "Ste 130",
 *            "address3": "",
 *            "city": "Valencia",
 *            "zip_code": "91355",
 *            "country": "US",
 *            "state": "CA",
 *            "display_address": [
 *              "24320 Town Center Dr",
 *              "Ste 130",
 *              "Valencia, CA 91355"
 *            ]
 *          },
 *          "phone": "+16612881002",
 *          "display_phone": "(661) 288-1002",
 *          "distance_miles": 2.82,
 *          "distance_kilometers": 4548
 *        }
 *      ]
 *    }
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
router.get("/search", authenticator, searchBuilder, function(req, res) {
  const query = process.env.YELP_API_SEARCH + req.queryString;

  axios
    .get(query, {
      headers: {
        authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    })
    .then((restaurants) => {
      res.status(200).json(restaurants.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(internalError(err));
    });
});

module.exports = router;
