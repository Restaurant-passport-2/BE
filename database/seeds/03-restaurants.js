exports.seed = function(knex) {
  return knex("restaurant").insert({
    user_id: 1,
    name: "Crusty Crab",
    street_address: "1146 Nagoya Way",
    city: "San Pedro",
    state: "CA",
    zipcode: "90731",
    phone_number: "(310) 519-9058",
    personal_rating: 4,
    notes: "Some notes about this restaurant",
    stamped: true,
  });
};
