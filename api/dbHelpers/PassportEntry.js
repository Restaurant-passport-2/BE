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
    .select("*")
    .from("passport_entry")
    .where({ passport_id: passport_id });
}

function insert(passport_entry) {
  //Data for new passport_entry table row - Needs restaurant_id which is supplied later in the function
  const entry = {
    passport_id: passport_entry.passport_id,
    city: passport_entry.city,
    personal_rating: passport_entry.personal_rating,
    notes: passport_entry.notes,
    stamped: passport_entry.stamped, //Optional
  };

  //Find if the restaurant already exists
  return restaurant.findByAddress(passport_entry.street_address).then((foundRestaurant) => {
    if (foundRestaurant) {
      //Restaurant already exists, so use it's ID as reference for restaurant_id to be used in new passport_entry row
      entry.restaurant_id = foundRestaurant.restaurant_id;

      //Return final knex call to be resolved in route handler
      return knex("passport_entry").insert(entry, "passport_entry_id");
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
      return restaurant.insert(newRestaurant).then((newRestaurantId) => {
        entry.restaurant_id = newRestaurantId;

        //Return final knex call to be resolved in route handler
        return knex("passport_entry").insert(entry, "passport_entry_id");
      });
    }
  });
}

function update(passport_entry_id, changes) {
  return knex("passport_entry")
    .where({ passport_entry_id: passport_entry_id })
    .update(changes);
}

function remove(passport_entry_id) {
  return knex("passport_entry")
    .where({ passport_entry_id: passport_entry_id })
    .del();
}
