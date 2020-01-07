module.exports = function validateEntry(req, res, next) {
  const {
    name,
    street_address,
    city,
    state,
    zipcode,
    // phone_number, //Optional
    // website_url, //Optional
    personal_rating,
    notes,
    // stamped, //Optional
  } = req.body;

  if (name && street_address && city && state && zipcode && personal_rating && notes) {
    next();
  } else {
    res
      .status(400)
      .json({
        message:
          "Please provide at minimum a name, street address, city, state, zipcode, personal rating, and notes to create a new entry",
      });
  }
};
