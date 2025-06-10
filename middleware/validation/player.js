import Joi from "joi";

const validPositions = ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'];

const validatePostPlayer = (req, res, next) => {
  const playerSchema = Joi.object({
    name: Joi.string()
      .min(4)
      .max(20)
      .required()
      .messages({
        "string.base": "Player name must be a string",
        "string.min": "Player name must be at least 4 characters",
        "string.max": "Player name must not exceed 20 characters",
        "string.empty": "Player name cannot be empty",
        "any.required": "Player name is required",
      }),

    age: Joi.number()
      .min(6)
      .max(120)
      .required()
      .messages({
        "number.base": "Age must be a number",
        "number.min": "Age must be at least 6 years old",
        "number.max": "Age must be less than 120 years old",
        "any.required": "Age is required",
      }),

    nationality: Joi.string()
      .min(6)
      .max(100)
      .required()
      .messages({
        "string.base": "Nationality must be a string",
        "string.min": "Nationality must be at least 6 characters",
        "string.max": "Nationality must not exceed 100 characters",
        "string.empty": "Nationality cannot be empty",
        "any.required": "Nationality is required",
      }),

    position: Joi.string()
      .max(20)  // Max length of the string
      .required()  // Must be present
      .valid(...validPositions)  // Must be one of the valid enum values
      .messages({
        "string.base": "Position must be a string",
        "string.max": "Position must not exceed 20 characters",
        "any.required": "Position is required",
        "any.only": "Position must be one of the following: GOALKEEPER, DEFENDER, MIDFIELDER, FORWARD",
      }),
  });

  const { error } = playerSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

// Validation for updating a player (PUT request)
const validatePutPlayer = (req, res, next) => {
  const playerSchema = Joi.object({
    name: Joi.string()
      .min(4)
      .max(20)
      .optional()
      .messages({
        "string.base": "Player name must be a string",
        "string.min": "Player name must be at least 4 characters",
        "string.max": "Player name must not exceed 20 characters",
        "string.empty": "Player name cannot be empty",
      }),

    age: Joi.number()
      .min(6)
      .max(120) // Adjusting the range to make more sense for age
      .optional()
      .messages({
        "number.base": "Age must be a number",
        "number.min": "Age must be at least 10 years old",
        "number.max": "Age must be less than 120 years old",
      }),

    nationality: Joi.string()
      .min(6)
      .max(100)
      .optional()
      .messages({
        "string.base": "Nationality must be a string",
        "string.min": "Nationality must be at least 6 characters",
        "string.max": "Nationality must not exceed 100 characters",
        "string.empty": "Nationality cannot be empty",
      }),

    position: Joi.string()
      .max(20)  // Max length of the string
      .optional()  // No validation if the position is not provided
      .valid(...validPositions)  // Must be one of the valid enum values
      .messages({
        "string.base": "Position must be a string",
        "string.max": "Position must not exceed 20 characters",
        "any.only": "Position must be one of the following: GOALKEEPER, DEFENDER, MIDFIELDER, FORWARD",
      }),
  }).min(1); // Require at least one field to be updated

  const { error } = playerSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

export { validatePostPlayer, validatePutPlayer };

