import Joi from "joi";

const validatePostTeam = (req, res, next) => {
    const teamSchema = Joi.object({
      name: Joi.string()
        .min(4)
        .max(20)
        .messages({
          "string.base": "Team name must be a string",
          "string.min": "Team name must be at least 4 characters",
          "string.max": "Team name must not exceed 20 characters",
          "string.empty": "Team name cannot be empty",
          "any.required": "Team name is required",
        }),
  
      coach: Joi.string()
        .min(6)
        .max(20)
        .messages({
          "string.base": "Coach must be a string",
          "string.min": "Coach name must be at least 6 characters",
          "string.max": "Coach name must not exceed 20 characters",
          "any.required": "Coach is required",
        }),
  
      stadium: Joi.string()
        .min(6)
        .max(100)
        .messages({
          "string.base": "Stadium must be a string",
          "string.min": "Stadium name must be at least 6 characters",
          "string.max": "Stadium name must not exceed 100 characters",
          "string.empty": "Stadium cannot be empty",
          "any.required": "Stadium is required",
        }),
    });
  
    const { error } = teamSchema.validate(req.body);
  
    if (error) {
      return res.status(409).json({ message: error.details[0].message });
    }
  
    next();
  };



const validatePutTeam = (req, res, next) => {
  const teamSchema = Joi.object({
    teamname: Joi.string()
      .min(4)
      .max(20)
      .optional()
      .messages({
        "string.base": "Team name must be a string",
        "string.min": "Team name must be at least 4 characters",
        "string.max": "Team name must not exceed 20 characters",
        "string.empty": "Team name cannot be empty",
      }),

    email: Joi.string()
      .email()
      .min(6)
      .max(20)
      .optional()
      .messages({
        "string.base": "Email must be a string",
        "string.email": "Email must be a valid email address",
        "string.min": "Email must be at least 6 characters",
        "string.max": "Email must not exceed 20 characters",
      }),

    password: Joi.string()
      .min(6)
      .max(100)
      .optional()
      .messages({
        "string.base": "Password must be a string",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must not exceed 100 characters",
        "string.empty": "Password cannot be empty",
      }),
  }).min(1); // Require at least one field to be updated

  const { error } = teamSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};



export { validatePostTeam, validatePutTeam };