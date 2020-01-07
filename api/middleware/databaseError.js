module.exports = function databaseError(err) {
  if (process.env.NODE_ENV === "development") {
    return {
      err,
    };
  } else {
    return { error: "An error occurred." };
  }
};
