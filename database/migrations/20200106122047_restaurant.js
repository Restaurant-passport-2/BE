exports.up = function(knex) {
  return knex.schema.createTable("restaurant", (tbl) => {
    tbl.increments("restuarant_id");

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

    //Average of user ratings (on gathered from app)
    tbl
      .integer("public_rating")
      .unsigned()
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("restaurant");
};
