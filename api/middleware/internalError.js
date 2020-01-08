module.exports = function internalError(err) {
  if (process.env.NODE_ENV === "development") {
    if (err.hasOwnProperty()) {
      return { err };
    }
  }
  //Fallback to generic when not in development mode
  return { error: "Server error." };
};
