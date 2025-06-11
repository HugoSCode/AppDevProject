import Joi from "joi";


const validatePostTeamStats = (req, res, next) => {
  const matchStatSchema = Joi.object({
    teamId: Joi.string()
      .uuid()
      .required()
      .messages({
        "string.base": "Team ID must be a string",
        "string.guid": "Team ID must be a valid UUID",
        "string.empty": "Team ID cannot be empty",
        "any.required": "Team ID is required",
      }),

    leagueId: Joi.string()
      .pattern()
      .uuid()
      .required()
      .messages({
        "string.base": "League ID must be a string",
        "string.guid": "League ID must be a valid UUID",
        "string.empty": "League ID cannot be empty",
        "any.required": "League ID is required",
      }),

    wins: Joi.number()
      .integer()
      .min(0)
      .max(1000)
      .required()
      .messages({
        "number.base": "Wins must be a number",
        "number.integer": "Wins must be an integer",
        "number.min": "Wins must be at least 0",
        "any.required": "Wins is required",
      }),

    draws: Joi.number()
      .integer()
      .min(0)
      .max(1000)
      .required()
      .messages({
        "number.base": "Draws must be a number",
        "number.integer": "Draws must be an integer",
        "number.min": "Draws must be at least 0",
        "any.required": "Draws is required",
      }),

    losses: Joi.number()
      .integer()
      .min(0)
      .max(1000)
      .required()
      .messages({
        "number.base": "Losses must be a number",
        "number.integer": "Losses must be an integer",
        "number.min": "Losses must be at least 0",
        "any.required": "Losses is required",
      }),

    points: Joi.number()
      .integer()
      .min(0)
      .max(3000)
      .required()
      .messages({
        "number.base": "Points must be a number",
        "number.integer": "Points must be an integer",
        "number.min": "Points must be at least 0",
        "any.required": "Points is required",
      }),
  });

  const { error } = matchStatSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

const validatePutTeamStats = (req, res, next) => {
  const matchStatSchema = Joi.object({
    teamId: Joi.string()
      .uuid()
      .optional()
      .messages({
        "string.base": "Team ID must be a string",
        "string.guid": "Team ID must be a valid UUID",
        "string.empty": "Team ID cannot be empty",
      }),

    leagueId: Joi.string()
      .uuid()
      .optional()
      .messages({
        "string.base": "League ID must be a string",
        "string.guid": "League ID must be a valid UUID",
        "string.empty": "League ID cannot be empty",
      }),

    wins: Joi.number()
      .integer()
      .min(0)
      .max(1000)
      .optional()
      .messages({
        "number.base": "Wins must be a number",
        "number.integer": "Wins must be an integer",
        "number.min": "Wins must be at least 0",
      }),

    draws: Joi.number()
      .integer()
      .min(0)
      .max(1000)
      .optional()
      .messages({
        "number.base": "Draws must be a number",
        "number.integer": "Draws must be an integer",
        "number.min": "Draws must be at least 0",
      }),

    losses: Joi.number()
      .integer()
      .min(0)
      .max(1000)
      .optional()
      .messages({
        "number.base": "Losses must be a number",
        "number.integer": "Losses must be an integer",
        "number.min": "Losses must be at least 0",
      }),

    points: Joi.number()
      .integer()
      .min(0)
      .max(3000)
      .optional()
      .messages({
        "number.base": "Points must be a number",
        "number.integer": "Points must be an integer",
        "number.min": "Points must be at least 0",
      }),
  }).min(1); // Require at least one field to update

  const { error } = matchStatSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

export { validatePostTeamStats, validatePutTeamStats };
