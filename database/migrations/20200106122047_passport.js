exports.up = function(knex) {
  return knex.schema.createTable("passport", (tbl) => {
    tbl.increments("passport_id");

    //user_id column which references the column "user_id" in the user_account table
    //When a user is deleted, we want to delete their passport as well.
    tbl
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("user_account")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("passport");
};
