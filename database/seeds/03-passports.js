exports.seed = function(knex) {
  return knex("passport").insert({
    user_id: 1,
  });
};
