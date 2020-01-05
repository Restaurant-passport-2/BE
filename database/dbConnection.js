require("dotenv").config();
const knex = require("knex");
const config = require("../knexfile");

const env = process.env.DATABASE_ENV || "development";

module.exports = knex(config[env]);
