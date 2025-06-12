import Joi from "joi";

const validatePostMatch = (req, res, next) => {
  const matchSchema = Joi.object({
    homeTeamId: Joi.string()
      .required()
      .uuid()
      .messages({
        "string.base": "Home team ID must be a string",
        "string.guid": "Home Team ID must be a valid UUID",
        "any.required": "Home team ID is required",
        "string.empty": "Home team ID cannot be empty",
        
      }),

    awayTeamId: Joi.string()
      .required()
      .uuid()
      .messages({
        "string.base": "Away team ID must be a string",
        "string.guid": "Away Team ID must be a valid UUID",
        "any.required": "Away team ID is required",
        "string.empty": "Away team ID cannot be empty",
      }),

    date: Joi.date()
      .greater("2000-01-01")
      .required()
      .messages({
        "date.base": "Date must be a valid ISO date",
        "date.format": "Date must follow ISO 8601 format",
        "date.greater": "Date must be after January 1, 2000",
        "any.required": "Match date is required",
      }),
      stadium: Joi.string()
        .min(3)
        .max(100)
        .messages({
          "string.base": "Stadium must be a string",
          "string.min": "Stadium name must be at least 6 characters",
          "string.max": "Stadium name must not exceed 100 characters",
          "string.empty": "Stadium cannot be empty",
          "any.required": "Stadium is required",
        }),
          leagueId: Joi.string()
            .uuid()
            .required()
            .messages({
              "string.base": "League ID must be a string",
              "string.guid": "League ID must be a valid UUID",
              "string.empty": "League ID cannot be empty",
              "any.required": "League ID is required",
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
    homeTeamId: Joi.string()
      .uuid()
      .messages({
        "string.base": "Home team ID must be a string",
        "string.guid": "Home Team ID must be a valid UUID",
        "string.empty": "Home team ID cannot be empty",
      }),

    awayTeamId: Joi.string()
      .uuid()
      .messages({
        "string.base": "Away team ID must be a string",
        "string.guid": "Away Team ID must be a valid UUID",
        "string.empty": "Away team ID cannot be empty",
      }),

    date: Joi.date()
      .iso()
      .greater("2000-01-01")
      .messages({
        "date.base": "Date must be a valid ISO date",
        "date.format": "Date must follow ISO 8601 format",
        "date.greater": "Date must be after January 1, 2000",
      }),

    stadium: Joi.string()
        .min(3)
        .max(100)
        .messages({
          "string.base": "Stadium must be a string",
          "string.min": "Stadium name must be at least 6 characters",
          "string.max": "Stadium name must not exceed 100 characters",
          "string.empty": "Stadium cannot be empty",
        }),
     leagueId: Joi.string()
          .uuid()
          .messages({
            "string.base": "League ID must be a string",
            "string.guid": "League ID must be a valid UUID",
            "string.empty": "League ID cannot be empty",
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
