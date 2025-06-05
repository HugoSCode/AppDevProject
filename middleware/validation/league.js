import Joi from "joi";

const validatePostLeague = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        "string.base": "League name must be a string",
        "string.min": "League name must be at least 3 characters",
        "string.max": "League name must not exceed 50 characters",
        "string.empty": "League name cannot be empty",
        "any.required": "League name is required",
      }),

    country: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        "string.base": "Country must be a string",
        "string.min": "Country must be at least 3 characters",
        "string.max": "Country must not exceed 50 characters",
        "string.empty": "Country cannot be empty",
        "any.required": "Country is required",
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

const validatePutLeague = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .optional()
      .messages({
        "string.base": "League name must be a string",
        "string.min": "League name must be at least 3 characters",
        "string.max": "League name must not exceed 50 characters",
        "string.empty": "League name cannot be empty",
      }),

    country: Joi.string()
      .min(3)
      .max(50)
      .optional()
      .messages({
        "string.base": "Country must be a string",
        "string.min": "Country must be at least 3 characters",
        "string.max": "Country must not exceed 50 characters",
        "string.empty": "Country cannot be empty",
      }),
  }).min(1); 

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

export { validatePostLeague, validatePutLeague };
