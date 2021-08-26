const errorFactory = (...args) => {
  return {
    errors: args.map((error) => ({
      msg: error,
    })),
  };
};

module.exports = { errorFactory };
