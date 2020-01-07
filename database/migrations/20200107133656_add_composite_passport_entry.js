exports.up = function(knex) {
  return knex.schema.table("passport_entry", (tbl) => {
    tbl.unique(["passport_id", "restaurant_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.table("passport_entry", (tbl) => {
    tbl.dropUnique(["passport_id", "restaurant_id"]);
  });
};
