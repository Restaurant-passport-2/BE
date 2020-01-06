exports.up = function(knex) {
  return knex.schema.table("user_account", (tbl) => {
    tbl.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table("user_account", (tbl) => {
    tbl.dropColumn("name");
  });
};
