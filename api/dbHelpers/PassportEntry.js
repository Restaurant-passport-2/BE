const knex = require("../../database/dbConnection");
const restaurant = require("./Restaurant");

module.exports = {
  find,
  insert,
  update,
  remove,
};

function find(passport_id) {
  return knex
    .select(["passport_entry_id", "restaurant_id", "city", "personal_rating", "notes", "stamped"])
    .from("passport_entry")
    .where({ passport_id: passport_id })
    .then(async (entries) => {
      //entries is an array of passport_entry objects
      if (entries.length > 0) {
        restaurantIds = [];
        entries.forEach((entry) => {
          restaurantIds.push(entry.restaurant_id);
        });
        return await knex
          .select(["name", "street_address", "city", "state", "zipcode", "phone_number", "website_url"])
          .from("restaurant")
          .whereIn("restaurant_id", restaurantIds)
          .then((restaurants) => {
            return entries.map((entry, idx) => {
              return { ...entry, restaurant: restaurants[idx] };
            });
          });
      }
    });
}

async function insert(passport_entry) {
  //Data for new passport_entry table row - Needs restaurant_id which is supplied later in the function
  const entry = {
    passport_id: passport_entry.passport_id,
    city: passport_entry.city,
    personal_rating: passport_entry.personal_rating ? Number(passport_entry.personal_rating) : 0,
    notes: passport_entry.notes,
    stamped: passport_entry.stamped ? 1 : 0, //Optional
  };

  //Find if the restaurant already exists
  return await restaurant.findByAddress(passport_entry.street_address).then(async (foundRestaurant) => {
    if (foundRestaurant) {
      //Restaurant already exists, so use it's ID as reference for restaurant_id to be used in new passport_entry row
      entry.restaurant_id = foundRestaurant.restaurant_id;

      //Return final knex call to be resolved in route handler
      return await knex("passport_entry").insert(entry, "passport_entry_id");
    } else {
      //No existing restaurants, so we need to insert one into the restaurant table
      //This will be the object to hold new restaurant

      const newRestaurant = {
        name: passport_entry.name,
        street_address: passport_entry.street_address,
        city: passport_entry.city,
        state: passport_entry.state,
        zipcode: passport_entry.zipcode,
        phone_number: passport_entry.phone_number, //Optional
        website_url: passport_entry.website_url, //Optional
      };

      // Insert into restaurant table, then take the new restaurant ID and set it into entry to be finally inserted into passport_entry table
      const newRestaurantId = await restaurant.insert(newRestaurant);
      entry.restaurant_id = newRestaurantId[0];

      //Return final knex call to be resolved in route handler
      return knex("passport_entry").insert(entry, "passport_entry_id");
    }
  });
}

function update(passport_entry_id, changes) {
  return knex("passport_entry")
    .where({ passport_entry_id: passport_entry_id })
    .update(changes);
}

async function remove(user_id, passport_entry_id) {
  const queryRes = await knex
    .select("pp.user_id")
    .from("passport AS pp")
    .join("passport_entry AS pe", "pp.passport_id", "=", "pe.passport_id")
    .where("pe.passport_entry_id", "=", passport_entry_id)
    .andWhere("pp.user_id", "=", user_id)
    .first();
  if (queryRes && queryRes.user_id === user_id) {
    return knex("passport_entry")
      .where("passport_entry_id", passport_entry_id)
      .del();
  }
}
