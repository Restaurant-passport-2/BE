exports.up = function(knex) {
  return knex.schema.table("user_account", (tbl) => {
    //Preferable naming conventions should be upheld.
    tbl.renameColumn("id", "user_id");
  });
};

exports.down = function(knex) {
  return knex.schema.table("user_account", (tbl) => {
    tbl.renameColumn("user_id", "id");
  });
};
