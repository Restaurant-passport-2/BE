exports.up = function(knex) {
  return knex.schema.createTable("user_account", (tbl) => {
    tbl.increments();

    tbl
      .string("email")
      .unique()
      .notNullable();

    tbl
      .string("username")
      .unique()
      .notNullable();

    tbl.string("password").notNullable();

    tbl.string("city").notNullable();

    tbl.string("zipcode").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_account");
};
