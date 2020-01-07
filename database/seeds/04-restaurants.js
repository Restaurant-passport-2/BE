exports.seed = function(knex) {
  return knex("restaurant").insert({
    name: "Chi Chi's Pizza",
    street_address: "23043 Soledad Canyon Rd",
    city: "Santa Clarita",
    state: "CA",
    zipcode: "91350",
    phone_number: "(661) 259-4040",
  });
};
