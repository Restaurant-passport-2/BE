exports.up = function(knex) {
  return knex.schema.createTable("passport_entry", (tbl) => {
    tbl.increments("passport_entry_id");

    //passport_id references the passport_id column in the passport table.
    //When we delete a passport we want to remove all the entries as well.
    tbl
      .integer("passport_id")
      .notNullable()
      .references("passport_id")
      .inTable("passport")
      .onDelete("CASCADE");

    //restaurant_id references the restaurant_id columnd in the restaurant table.
    //If a restaurant was ever deleted we would want to delete the entry
    //because it would otherwise point to invalid data.
    tbl
      .integer("restaurant_id")
      .notNullable()
      .references("restaurant_id")
      .inTable("restaurant")
      .onDelete("CASCADE");

    //Required city
    tbl.string("city").notNullable();

    //Required personal rating
    tbl
      .integer("personal_rating")
      .unsigned() //Force positive only
      .notNullable();

    //Required notes about restaurant visit
    tbl.text("notes").notNullable();

    //Indicator for having visited a restaurant
    tbl
      .boolean("stamped")
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("passport_entry");
};
