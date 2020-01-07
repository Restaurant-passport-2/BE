const knex = require("../../database/dbConnection");

module.exports = {
  find,
  findByUsername,
  insert,
  update,
  remove,
};

function find(user_id) {
  if (user_id) {
    return knex
      .select("*")
      .from("user_account")
      .where({ user_id: user_id })
      .first(); //I don't want an array with 1 index thanks.
  } else {
    return knex.select("*").from("user_account");
  }
}

function findByUsername(username) {
  return knex
    .select("*")
    .from("user_account")
    .where({ username: username })
    .first(); //See above comment...
}

function insert(user) {
  return knex("user_account").insert(user, "user_id");
}

function update(user_id, changes) {
  return knex("user_account")
    .where({ user_id: user_id })
    .update(changes);
}

function remove(user_id) {
  return knex("user_account")
    .where({ user_id: user_id })
    .del();
}
