const asyncHandler = require("express-async-handler");

const validateSchemaMdw = (schema) =>
  asyncHandler(async (req, res, next) => {
    await schema.validate(req.body);
    next();
  });

module.exports = validateSchemaMdw;
