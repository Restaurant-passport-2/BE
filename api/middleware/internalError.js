module.exports = function internalError(err) {
  console.log("InternalError:", err);
  if (process.env.NODE_ENV === "development") {
    if (err.hasOwnProperty()) {
      return { err };
    }
  }
  return { error: "Server error." };
};
