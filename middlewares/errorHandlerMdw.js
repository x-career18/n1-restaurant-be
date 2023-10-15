const errorHandlerMdw = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    data: null,
    success: false,
    message: err.message,
    statusCode,
    stack: err.stack,
  });
};

module.exports = errorHandlerMdw;
