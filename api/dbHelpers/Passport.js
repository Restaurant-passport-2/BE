const knex = require("../../database/dbConnection");
const entry = require("./PassportEntry");

module.exports = {
  find,
  insert,
  remove,
  entry,
};

function find(user_id) {
  return knex
    .select("*")
    .from("passport")
    .where({ user_id: user_id })
    .first()
    .then((passport) => {
      if (passport) {
        return entry.find(passport.passport_id).then((passportData) => {
          return {
            ppid: passport.passport_id,
            entries: passportData,
          };
        });
      }
    });
}

function insert(passport) {
  return knex("passport").insert(passport);
}

function remove(user_id) {
  return knex("passport")
    .where({ user_id: user_id })
    .del();
}
