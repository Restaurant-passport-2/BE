module.exports = function internalError(err) {
  if (process.env.NODE_ENV === "development") {
    if (err.hasOwnProperty()) {
      return { err };
    }
  }
  //Fallback to generic when not in development mode or if error is internally thrown (type error, undefineds, etc)
  return { error: "Server error." };
};
