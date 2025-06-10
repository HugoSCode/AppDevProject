import Joi from "joi";

// Validation for creating new PlayerStatistics (POST request)
const validatePostPlayerStatistics = (req, res, next) => {
  const playerStatisticsSchema = Joi.object({
    playerId: Joi.string()
      .uuid()
      .required()
      .messages({
        "string.base": "Player ID must be a string",
        "string.guid": "Player ID must be a valid UUID",
        "any.required": "Player ID is required",
        "string.empty": "Player ID cannot be empty",
      }),

    matchId: Joi.string()
      .uuid()
      .required()
      .messages({
        "string.base": "Match ID must be a string",
        "string.guid": "Match ID must be a valid UUID",
        "any.required": "Match ID is required",
        "string.empty": "Match ID cannot be empty",
      }),

    goals: Joi.number()
      .integer()
      .min(0)
      .max(20)
      .required()
      .messages({
        "number.base": "Goals must be a number",
        "number.integer": "Goals must be an integer",
        "number.min": "Goals must be at least 0",
        "number.max": "Goals must not exceed 20",
        "any.required": "Goals are required",
      }),

    assists: Joi.number()
      .integer()
      .min(0)
      .max(20)
      .required()
      .messages({
        "number.base": "Assists must be a number",
        "number.integer": "Assists must be an integer",
        "number.min": "Assists must be at least 0",
        "number.max": "Assists must not exceed 20",
        "any.required": "Assists are required",
      }),

    passes: Joi.number()
      .integer()
      .min(0)
      .max(300)
      .required()
      .messages({
        "number.base": "Passes must be a number",
        "number.integer": "Passes must be an integer",
        "number.min": "Passes must be at least 0",
        "number.max": "Passes must not exceed 300",
        "any.required": "Passes are required",
      }),

    tackles: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .messages({
        "number.base": "Tackles must be a number",
        "number.integer": "Tackles must be an integer",
        "number.min": "Tackles must be at least 0",
        "number.max": "Tackles must not exceed 100",
        "any.required": "Tackles are required",
      }),

    saves: Joi.number()
      .integer()
      .min(0)
      .max(50)
      .required()
      .messages({
        "number.base": "Saves must be a number",
        "number.integer": "Saves must be an integer",
        "number.min": "Saves must be at least 0",
        "number.max": "Saves must not exceed 50",
        "any.required": "Saves are required",
      }),
  });

  const { error } = playerStatisticsSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

// Validation for updating PlayerStatistics (PUT request)
const validatePutPlayerStatistics = (req, res, next) => {
  const playerStatisticsSchema = Joi.object({
    playerId: Joi.string()
      .uuid()
      .optional()
      .messages({
        "string.base": "Player ID must be a string",
        "string.guid": "Player ID must be a valid UUID",
        "string.empty": "Player ID cannot be empty",
      }),

    matchId: Joi.string()
      .uuid()
      .optional()
      .messages({
        "string.base": "Match ID must be a string",
        "string.guid": "Match ID must be a valid UUID",
        "string.empty": "Match ID cannot be empty",
      }),

    goals: Joi.number()
      .integer()
      .min(0)
      .max(20)
      .optional()
      .messages({
        "number.base": "Goals must be a number",
        "number.integer": "Goals must be an integer",
        "number.min": "Goals must be at least 0",
        "number.max": "Goals must not exceed 20",
      }),

    assists: Joi.number()
      .integer()
      .min(0)
      .max(20)
      .optional()
      .messages({
        "number.base": "Assists must be a number",
        "number.integer": "Assists must be an integer",
        "number.min": "Assists must be at least 0",
        "number.max": "Assists must not exceed 20",
      }),

    passes: Joi.number()
      .integer()
      .min(0)
      .max(300)
      .optional()
      .messages({
        "number.base": "Passes must be a number",
        "number.integer": "Passes must be an integer",
        "number.min": "Passes must be at least 0",
        "number.max": "Passes must not exceed 300",
      }),

    tackles: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .optional()
      .messages({
        "number.base": "Tackles must be a number",
        "number.integer": "Tackles must be an integer",
        "number.min": "Tackles must be at least 0",
        "number.max": "Tackles must not exceed 100",
      }),

    saves: Joi.number()
      .integer()
      .min(0)
      .max(50)
      .optional()
      .messages({
        "number.base": "Saves must be a number",
        "number.integer": "Saves must be an integer",
        "number.min": "Saves must be at least 0",
        "number.max": "Saves must not exceed 50",
      }),
  }).min(1); // Require at least one field to update

  const { error } = playerStatisticsSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

export { validatePostPlayerStatistics, validatePutPlayerStatistics };

