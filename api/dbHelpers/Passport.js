const user = require("./User");
const restaurant = require("./Restaurant");

module.exports = {
  find,
  insertEntry,
  updateEntry,
  removeEntry,
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

async function insertEntry(user_id, newRestaurant) {
  await restaurant.insert(newRestaurant);
  return find(user_id);
}

async function updateEntry(user_id, restaurant_id, changes) {
  if (await restaurantOwnedByUser(user_id, restaurant_id)) {
    await restaurant.update(restaurant_id, changes);
    return find(user_id);
  } else {
    return false;
  }
}

async function removeEntry(user_id, restaurant_id) {
  if (await restaurantOwnedByUser(user_id, restaurant_id)) {
    await restaurant.remove(restaurant_id);
    return find(user_id);
  } else {
    return false;
  }
}

async function restaurantOwnedByUser(user_id, restaurant_id) {
  //Check if both A. restaurant is valid, and B. it is owned by the user trying to modify/delete it.
  const validRestaurants = await restaurant.findByUserId(user_id);
  const isOwnedByUser = validRestaurants.some((eatery) => eatery.restaurant_id === Number(restaurant_id));
  return isOwnedByUser;
}
