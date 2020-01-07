require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.HASH_SALT_ROUNDS);

exports.seed = function(knex) {
  return knex("user_account").insert([
    {
      name: "test",
      email: "test@email.com",
      username: "test",
      password: bcrypt.hashSync("test", saltRounds),
      city: "Santa Clarita",
      zipcode: "91350",
    },
  ]);
};
