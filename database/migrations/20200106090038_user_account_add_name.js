exports.up = function(knex) {
  return knex.schema.table("user_account", (tbl) => {
    //Add a name collumn to the user_account table.
    tbl.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table("user_account", (tbl) => {
    tbl.dropColumn("name");
  });
};
