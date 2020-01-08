module.exports = function validateEntry(req, res, next) {
  const {
    name,
    street_address,
    city,
    state,
    zipcode,
    // phone_number, //Optional
    // website_url, //Optional
    // personal_rating, //Optional
    notes,
    // stamped, //Optional
  } = req.body;

  if (name && street_address && city && state && zipcode && notes) {
    next();
  } else {
    res.status(400).json({
      error: "Please provide at minimum a name, street address, city, state, zipcode, and notes to create a new entry",
    });
  }
};
