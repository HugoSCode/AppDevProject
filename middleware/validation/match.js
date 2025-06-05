import Joi from "joi";

const validatePostMatch = (req, res, next) => {
  const matchSchema = Joi.object({
    homeTeamId: Joi.number()
      .integer()
      .required()
      .messages({
        "number.base": "Home team ID must be a number",
        "any.required": "Home team ID is required",
      }),

    awayTeamId: Joi.number()
      .integer()
      .invalid(Joi.ref("homeTeamId"))
      .required()
      .messages({
        "number.base": "Away team ID must be a number",
        "any.invalid": "Home team and away team cannot be the same",
        "any.required": "Away team ID is required",
      }),

    homeScore: Joi.number()
      .integer()
      .min(0)
      .required()
      .messages({
        "number.base": "Home score must be a number",
        "number.min": "Home score cannot be negative",
        "any.required": "Home score is required",
      }),

    awayScore: Joi.number()
      .integer()
      .min(0)
      .required()
      .messages({
        "number.base": "Away score must be a number",
        "number.min": "Away score cannot be negative",
        "any.required": "Away score is required",
      }),

    date: Joi.date()
      .iso()
      .required()
      .messages({
        "date.base": "Date must be a valid ISO date",
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
      .messages({
        "number.base": "Home team ID must be a number",
      }),

    awayTeamId: Joi.number()
      .integer()
      .invalid(Joi.ref("homeTeamId"))
      .messages({
        "number.base": "Away team ID must be a number",
        "any.invalid": "Home team and away team cannot be the same",
      }),

    homeScore: Joi.number()
      .integer()
      .min(0)
      .messages({
        "number.base": "Home score must be a number",
        "number.min": "Home score cannot be negative",
      }),

    awayScore: Joi.number()
      .integer()
      .min(0)
      .messages({
        "number.base": "Away score must be a number",
        "number.min": "Away score cannot be negative",
      }),

    date: Joi.date()
      .iso()
      .messages({
        "date.base": "Date must be a valid ISO date",
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
