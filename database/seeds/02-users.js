const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  return knex("user_account").insert([
    {
      email: "demo@email.com",
      username: "demo",
      password: bcrypt.hashSync("demo", 8),
      city: "Los Angeles",
      zipcode: "90011",
    },
  ]);
};
