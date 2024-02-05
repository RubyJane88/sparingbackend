const errorHandler = (err, req, res, next) => {
  console.log(err);

  res.status(500).send(err.message || "Something went wrong");
};
module.exports = errorHandler;
