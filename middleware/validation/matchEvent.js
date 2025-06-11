import Joi from "joi";


const validatePostMatchEvent = (req, res, next) => {
  const matchEventSchema = Joi.object({
    type: Joi.string()
      .valid("Goal", "Yellow Card", "Red Card", "Substitution", "Own Goal", "Penalty")
      .trim()
      .min(3)
      .required()
      .messages({
        "string.base": "Event type must be a string",
        "string.trim": "Event type cannot have leading/trailing spaces",
        "string.min": "Event type must be at least 3 characters",
        "any.only": "Event type must be one of: Goal, Yellow Card, Red Card, Substitution, Own Goal, Penalty",
        "any.required": "Event type is required",
      }),

    minute: Joi.number()
      .integer()
      .min(0)
      .max(130)
      .required()
      .messages({
        "number.base": "Minute must be a number",
        "number.integer": "Minute must be an integer",
        "number.min": "Minute cannot be negative",
        "number.max": "Minute cannot be greater than 130",
        "any.required": "Minute is required",
      }),

    matchId: Joi.string()
      .uuid()
      .required()
      .trim()
      .messages({
        "string.base": "Match ID must be a string",
        "string.guid": "Match ID must be a valid UUID",
        "string.trim": "Match ID cannot have leading or trailing spaces",
        "any.required": "Match ID is required",
      }),

    playerId: Joi.string()
      .uuid()
      .trim()
      .optional()
      .messages({
        "string.guid": "Player ID must be a valid UUID",
        "string.trim": "Player ID cannot have leading or trailing spaces",
        "string.base": "Player ID must be a string",
      }),

    details: Joi.string()
      .max(255)
      .trim()
      .allow(null, "")
      .min(0)
      .messages({
        "string.base": "Details must be a string",
        "string.max": "Details cannot exceed 255 characters",
        "string.trim": "Details cannot have leading/trailing spaces",
        "string.min": "Details must be at least 0 characters",
      }),
  });

  const { error } = matchEventSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};


const validatePutMatchEvent = (req, res, next) => {
  const matchEventSchema = Joi.object({
    type: Joi.string()
      .valid("Goal", "Yellow Card", "Red Card", "Substitution", "Own Goal", "Penalty")
      .trim()
      .min(3)
      .messages({
        "string.base": "Event type must be a string",
        "string.trim": "Event type cannot have leading/trailing spaces",
        "string.min": "Event type must be at least 3 characters",
        "any.only": "Event type must be one of: Goal, Yellow Card, Red Card, Substitution, Own Goal, Penalty",
      }),

    minute: Joi.number()
      .integer()
      .min(0)
      .max(130)
      .messages({
        "number.base": "Minute must be a number",
        "number.integer": "Minute must be an integer",
        "number.min": "Minute cannot be negative",
        "number.max": "Minute cannot be greater than 130",
      }),

    matchId: Joi.string()
      .uuid()
      .trim()
      .messages({
        "string.base": "Match ID must be a string",
        "string.guid": "Match ID must be a valid UUID",
        "string.trim": "Match ID cannot have leading or trailing spaces",
      }),

    playerId: Joi.string()
      .uuid()
      .trim()
      .messages({
        "string.guid": "Player ID must be a valid UUID",
        "string.trim": "Player ID cannot have leading or trailing spaces",
        "string.base": "Player ID must be a string",
      }),

    details: Joi.string()
      .max(255)
      .min(0)
      .trim()
      .allow(null, "")
      .messages({
        "string.base": "Details must be a string",
        "string.max": "Details cannot exceed 255 characters",
        "string.trim": "Details cannot have leading/trailing spaces",
        "string.min": "Details must be at least 0 characters",
      }),
  })
    .min(1)
    .messages({
      "object.min": "At least one field must be provided to update the match event",
    });

  const { error } = matchEventSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};



export { validatePostMatchEvent, validatePutMatchEvent };
