module.exports = function databaseError(err) {
  return {
    error: {
      message: err.detail,
      constraint: err.constraint,
    },
  };
};
