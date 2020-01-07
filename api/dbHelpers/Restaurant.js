const knex = require("../../database/dbConnection");

module.exports = {
  find,
  findByAddress,
  findByCity,
  insert,
  update,
  remove,
};

function find(restaurant_id) {
  if (restaurant_id) {
    return knex
      .select("*")
      .from("restaurant")
      .where({ restaurant_id: restaurant_id })
      .first();
  } else {
    return knex.select("*").from("restaurant");
  }
}

function findByAddress(street_address) {
  return knex
    .select("*")
    .from("restaurant")
    .where({ street_address: street_address })
    .first();
}

function findByCity(city) {
  return knex
    .select("*")
    .from("restaurant")
    .where({ city: city })
    .first();
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
