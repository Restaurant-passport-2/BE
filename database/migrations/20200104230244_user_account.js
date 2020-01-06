exports.up = function(knex) {
  return knex.schema.createTable("user_account", (tbl) => {
    tbl.increments();

    //Required Unique email
    tbl
      .string("email")
      .unique()
      .notNullable();

    //Required Unique username
    tbl
      .string("username")
      .unique()
      .notNullable();

    //Required password
    tbl.string("password").notNullable();

    //Required city
    tbl.string("city").notNullable();

    //Required zipcode
    tbl.string("zipcode").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_account");
};
