const cleaner = require("knex-cleaner");

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: "truncate", // Resets ids
    // Don't empty migration tables
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
  });
};
