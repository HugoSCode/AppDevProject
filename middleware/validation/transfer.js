import Joi from "joi";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const transferSchema = Joi.object({
  playerId: Joi.string()
    .pattern(uuidPattern)
    .required()
    .messages({
      "string.base": "Player ID must be a string",
      "string.pattern.base": "Player ID must be a valid UUID",
      "string.empty": "Player ID cannot be empty",
      "any.required": "Player ID is required",
    }),

  fromTeamId: Joi.string()
    .pattern(uuidPattern)
    .required()
    .messages({
      "string.base": "From Team ID must be a string",
      "string.pattern.base": "From Team ID must be a valid UUID",
      "string.empty": "From Team ID cannot be empty",
      "any.required": "From Team ID is required",
    }),

  toTeamId: Joi.string()
    .pattern(uuidPattern)
    .required()
    .messages({
      "string.base": "To Team ID must be a string",
      "string.pattern.base": "To Team ID must be a valid UUID",
      "string.empty": "To Team ID cannot be empty",
      "any.required": "To Team ID is required",
    }),

  fee: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "Transfer fee must be a number",
      "number.integer": "Transfer fee must be an integer",
      "number.min": "Transfer fee must be 0 or more",
      "any.required": "Transfer fee is required",
    }),

  date: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "Date must be a valid date",
      "date.format": "Date must be in ISO format",
      "any.required": "Date is required",
      "date.empty": "Date cannot be empty",
    }),

  transferType: Joi.string()
    .valid("PERMANENT", "LOAN")
    .required()
    .messages({
      "string.base": "Transfer type must be a string",
      "any.only": "Transfer type must be either 'PERMANENT' or 'LOAN'",
      "string.empty": "Transfer type cannot be empty",
      "any.required": "Transfer type is required",
    }),
});

const validatePostTransfer = (req, res, next) => {
  const { error } = transferSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};
 const validatePutTransfer = (req, res, next) => {
  const updateSchema = Joi.object({
    playerId: Joi.string()
      .pattern(uuidPattern)
      .messages({
        "string.base": "Player ID must be a string",
        "string.pattern.base": "Player ID must be a valid UUID",
        "string.empty": "Player ID cannot be empty",
      }),

    fromTeamId: Joi.string()
      .pattern(uuidPattern)
      .messages({
        "string.base": "From Team ID must be a string",
        "string.pattern.base": "From Team ID must be a valid UUID",
        "string.empty": "From Team ID cannot be empty",
      }),

    toTeamId: Joi.string()
      .pattern(uuidPattern)
      .messages({
        "string.base": "To Team ID must be a string",
        "string.pattern.base": "To Team ID must be a valid UUID",
        "string.empty": "To Team ID cannot be empty",
      }),

    fee: Joi.number()
      .integer()
      .min(0)
      .messages({
        "number.base": "Transfer fee must be a number",
        "number.integer": "Transfer fee must be an integer",
        "number.min": "Transfer fee must be 0 or more",
      }),

    date: Joi.date()
      .iso()
      .messages({
        "date.base": "Date must be a valid date",
        "date.format": "Date must be in ISO format",
        "date.empty": "Date cannot be empty",
      }),

    transferType: Joi.string()
      .valid("PERMANENT", "LOAN")
      .messages({
        "string.base": "Transfer type must be a string",
        "any.only": "Transfer type must be either 'PERMANENT' or 'LOAN'",
        "string.empty": "Transfer type cannot be empty",
      }),
  });

  const { error } = updateSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

export { validatePostTransfer, validatePutTransfer };