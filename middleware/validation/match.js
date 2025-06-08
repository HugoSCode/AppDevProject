import Joi from "joi";

const validatePostMatch = (req, res, next) => {
  const matchSchema = Joi.object({
    homeTeamId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        "number.base": "Home team ID must be a number",
        "number.integer": "Home team ID must be an integer",
        "number.positive": "Home team ID must be a positive number",
        "any.required": "Home team ID is required",
      }),

    awayTeamId: Joi.number()
      .integer()
      .positive()
      .invalid(Joi.ref("homeTeamId"))
      .required()
      .messages({
        "number.base": "Away team ID must be a number",
        "number.integer": "Away team ID must be an integer",
        "number.positive": "Away team ID must be a positive number",
        "any.invalid": "Home team and away team cannot be the same",
        "any.required": "Away team ID is required",
      }),

    homeScore: Joi.number()
      .integer()
      .min(0)
      .max(99)
      .required()
      .messages({
        "number.base": "Home score must be a number",
        "number.integer": "Home score must be an integer",
        "number.min": "Home score cannot be negative",
        "number.max": "Home score cannot be more than 99",
        "any.required": "Home score is required",
      }),

    awayScore: Joi.number()
      .integer()
      .min(0)
      .max(99)
      .required()
      .messages({
        "number.base": "Away score must be a number",
        "number.integer": "Away score must be an integer",
        "number.min": "Away score cannot be negative",
        "number.max": "Away score cannot be more than 99",
        "any.required": "Away score is required",
      }),

    date: Joi.date()
      .iso()
      .greater("2000-01-01")
      .required()
      .messages({
        "date.base": "Date must be a valid ISO date",
        "date.format": "Date must follow ISO 8601 format",
        "date.greater": "Date must be after January 1, 2000",
        "any.required": "Match date is required",
      }),
  });

  const { error } = matchSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};


const validatePutMatch = (req, res, next) => {
  const matchSchema = Joi.object({
    homeTeamId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        "number.base": "Home team ID must be a number",
        "number.integer": "Home team ID must be an integer",
        "number.positive": "Home team ID must be a positive number",
      }),

    awayTeamId: Joi.number()
      .integer()
      .positive()
      .invalid(Joi.ref("homeTeamId"))
      .messages({
        "number.base": "Away team ID must be a number",
        "number.integer": "Away team ID must be an integer",
        "number.positive": "Away team ID must be a positive number",
        "any.invalid": "Home team and away team cannot be the same",
      }),

    homeScore: Joi.number()
      .integer()
      .min(0)
      .max(99)
      .messages({
        "number.base": "Home score must be a number",
        "number.integer": "Home score must be an integer",
        "number.min": "Home score cannot be negative",
        "number.max": "Home score cannot be more than 99",
      }),

    awayScore: Joi.number()
      .integer()
      .min(0)
      .max(99)
      .messages({
        "number.base": "Away score must be a number",
        "number.integer": "Away score must be an integer",
        "number.min": "Away score cannot be negative",
        "number.max": "Away score cannot be more than 99",
      }),

    date: Joi.date()
      .iso()
      .greater("2000-01-01")
      .messages({
        "date.base": "Date must be a valid ISO date",
        "date.format": "Date must follow ISO 8601 format",
        "date.greater": "Date must be after January 1, 2000",
      }),
  }).min(1).messages({
    "object.min": "At least one field must be provided to update the match",
  });

  const { error } = matchSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};


export { validatePostMatch, validatePutMatch };
