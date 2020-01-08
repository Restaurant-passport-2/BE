exports.up = function(knex) {
  return knex.schema.createTable("restaurant", (tbl) => {
    tbl.increments("restaurant_id");

    //Reference user id in user_account (user owns the item)
    tbl
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("user_account")
      .onDelete("CASCADE");

    //Required name of restaurant
    tbl.string("name").notNullable();

    //Required street address
    tbl.string("street_address").notNullable();

    //Required city name
    tbl.string("city").notNullable();

    //Required state name
    tbl.string("state").notNullable();

    //Required zipcode
    tbl.string("zipcode").notNullable();

    //Restaurant phone # (Some places might not have one)
    tbl
      .string("phone_number")
      .notNullable()
      .defaultTo("No phone number listed");

    //Website - Nullable because business might not have online presence
    tbl
      .string("website_url")
      .notNullable()
      .defaultTo("No website listed");

    tbl
      .integer("personal_rating")
      .unsigned() //Force positive only
      .notNullable()
      .defaultTo(0);

    //Required notes about restaurant visit
    tbl.text("notes").notNullable();

    //Indicator for having visited a restaurant
    tbl.boolean("stamped").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("restaurant");
};
