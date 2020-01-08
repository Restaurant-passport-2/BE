const knex = require("../../database/dbConnection");

module.exports = {
  findByUserId,
  insert,
  update,
  remove,
};

function findByUserId(user_id) {
  return knex
    .select([
      "restaurant_id",
      "name",
      "street_address",
      "city",
      "state",
      "zipcode",
      "phone_number",
      "website_url",
      "personal_rating",
      "notes",
      "stamped",
    ])
    .from("restaurant")
    .where({ user_id: user_id });
}

function insert(restaurant) {
  return knex("restaurant").insert(restaurant, "restaurant_id");
}

function update(restaurant_id, changes) {
  return knex("restaurant")
    .where({ restaurant_id: restaurant_id })
    .update(changes);
}

function remove(restaurant_id) {
  return knex("restaurant")
    .where({ restaurant_id: restaurant_id })
    .del();
}
