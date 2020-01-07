exports.seed = function(knex) {
  return knex("passport_entry").insert({
    passport_id: 1,
    restaurant_id: 1,
    city: "Santa Clarita",
    personal_rating: 5,
    notes: "Enjoyed the atmosphere and dining experience. Pizza was great.",
    stamped: true,
  });
};
