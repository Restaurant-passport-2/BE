module.exports = function internalError(err) {
  if (process.env.NODE_ENV === "development") {
    return {
      err,
    };
  } else {
    return { error: "Server error." };
  }
};
