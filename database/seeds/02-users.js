require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.HASH_SALT_ROUNDS);

exports.seed = function(knex) {
  return knex("user_account").insert([
    {
      name: "Test User",
      email: "test@email.com",
      username: "test",
      password: bcrypt.hashSync("test", saltRounds),
      city: "Fake City",
      zipcode: "12345",
    },
  ]);
};
