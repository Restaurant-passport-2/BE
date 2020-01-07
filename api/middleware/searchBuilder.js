const userDB = require("../dbHelpers/Users");
const { internalError } = require("./middleware");

module.exports = function searchBuilder(req, res, next) {
  userDB
    .find(req.token.sub)
    .then((user) => {
      if (user) {
        let queryString = "?location=";
        req.query.location ? (queryString += `${req.query.location}`) : (queryString += `${user.city},${user.zipcode}`);

        req.query.term ? (queryString += `&term=${req.query.term}`) : queryString;

        req.query.categories ? (queryString += `&categories=${req.query.categories}`) : queryString;

        if (req.query.price) {
          const price = req.query.price;
          const filteredPriceRange = [];

          price.split(",").forEach((value) => {
            if (value > 0 && value < 5) {
              filteredPriceRange.push(value);
            }
          });

          if (filteredPriceRange.length > 0) {
            queryString += `&price=${filteredPriceRange.join(",")}`;
          }
        }

        req.query.open_now ? (queryString += `&open_now=${req.query.open_now}`) : queryString;

        if (req.query.sort_by) {
          const sortBy = req.query.sort_by;

          ["best_match", "rating", "review_count", "distance"].find((option) => {
            option === sortBy ? (queryString += `&sort_by=${option}`) : false;
          });
        }

        req.query.limit && Number(req.query.limit) < 50 && Number(req.query.limit) > 1
          ? (queryString += `&limit=${req.query.limit}`)
          : queryString;

        req.query.offset && Number(req.query.offset) > 0 ? (queryString += `&offset=${req.query.offset}`) : queryString;

        req.queryString = queryString;
        next();
      } else {
        res.status(401).json(internalError({ error: "Token invalid" }));
      }
    })
    .catch((err) => {
      res.status(500).json(internalError(err));
    });
};
