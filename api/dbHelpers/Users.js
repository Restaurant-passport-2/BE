const knex = require("../../database/dbConnection");

module.exports = {
  find,
  findByUsername,
  insert,
  update,
  remove,
};

function find(id) {
  if (id) {
    return knex
      .select("*")
      .from("user_account")
      .where({ id: id })
      .first();
  } else {
    return knex.select("*").from("user_account");
  }
}

function findByUsername(username) {
  return knex
    .select("*")
    .from("user_account")
    .where({ username: username })
    .first();
}

function insert(user) {
  return knex("user_account").insert(user, "id");
}

function update(id, changes) {
  return knex("user_account")
    .where({ id: id })
    .update(changes);
}

function remove(id) {
  return knex("user_account")
    .where({ id: id })
    .del();
}
