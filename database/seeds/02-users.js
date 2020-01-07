const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  return knex("user_account").insert([
    {
      name: "demo",
      email: "demo@email.com",
      username: "demo",
      password: bcrypt.hashSync("demo", 8),
      city: "Demo Town",
      zipcode: "12345",
    },
  ]);
};
