import Joi from "joi";

const validatePostInjury = (req, res, next) => {
  const injurySchema = Joi.object({
    playerId: Joi.string()
      .uuid()
      .required()
      .messages({
        "string.base": "Player ID must be a string",
        "string.uuid": "Player ID must be a valid UUID",
        "string.empty": "Player ID cannot be empty",
        "any.required": "Player ID is required",
      }),

    description: Joi.string()
      .min(5)
      .max(255)
      .required()
      .messages({
        "string.base": "Description must be a string",
        "string.min": "Description must be at least 5 characters long",
        "string.max": "Description must not exceed 255 characters",
        "any.required": "Description is required",
      }),

    date: Joi.date()
      .iso()
      .greater("2000-01-01")
      .required()
      .messages({
        "date.base": "Date must be a valid ISO date",
        "date.format": "Date must follow ISO 8601 format",
        "date.greater": "Date must be after January 1, 2000",
        "any.required": "Date is required",
      }),

    duration: Joi.number()
      .integer()
      .positive()
      .max(365)
      .required()
      .messages({
        "number.base": "Duration must be a number",
        "number.integer": "Duration must be an integer",
        "number.positive": "Duration must be a positive number",
        "number.max": "Duration cannot exceed 365 days",
        "any.required": "Duration is required",
      }),
  });

  const { error } = injurySchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

const validatePutInjury = (req, res, next) => {
  const injurySchema = Joi.object({
    playerId: Joi.string()
      .uuid()
      .messages({
        "string.base": "Player ID must be a string",
        "string.uuid": "Player ID must be a valid UUID",
        "string.empty": "Player ID cannot be empty",
      }),

    description: Joi.string()
      .min(5)
      .max(255)
      .messages({
        "string.base": "Description must be a string",
        "string.min": "Description must be at least 5 characters long",
        "string.max": "Description must not exceed 255 characters",
      }),

    date: Joi.date()
      .iso()
      .greater("2000-01-01")
      .messages({
        "date.base": "Date must be a valid ISO date",
        "date.format": "Date must follow ISO 8601 format",
        "date.greater": "Date must be after January 1, 2000",
      }),

    duration: Joi.number()
      .integer()
      .positive()
      .max(365)
      .messages({
        "number.base": "Duration must be a number",
        "number.integer": "Duration must be an integer",
        "number.positive": "Duration must be a positive number",
        "number.max": "Duration cannot exceed 365 days",
      }),
  }).min(1).messages({
    "object.min": "At least one field must be provided to update the injury",
  });

  const { error } = injurySchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

export { validatePostInjury, validatePutInjury };
