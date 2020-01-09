const knex = require("../../database/dbConnection");

module.exports = {
  find,
  findByUsername,
  insert,
};

function find(user_id) {
  return knex
    .select("*")
    .from("user_account")
    .where({ user_id: user_id })
    .first();
}

function findByUsername(username) {
  return knex
    .select("*")
    .from("user_account")
    .where({ username: username })
    .first();
}

function insert(user) {
  return knex("user_account").insert(user, "user_id");
}
