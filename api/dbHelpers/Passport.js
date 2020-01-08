const user = require("./User");
const restaurant = require("./Restaurant");

module.exports = {
  find,
  // insert,
  user,
  restaurant,
};

async function find(user_id) {
  const restaurants = await restaurant.findByUserId(user_id);
  if (restaurants.length > 0) {
    return {
      entries: restaurants,
    };
  } else {
    return { entries: [] };
  }
}
