import Joi from "joi";

const validatePostUser = (req, res, next) => {
    const userSchema = Joi.object({
      username: Joi.string()
        .min(4)
        .max(20)
        .messages({
          "string.base": "Username must be a string",
          "string.min": "Username must be at least 4 characters",
          "string.max": "Username must not exceed 20 characters",
          "string.empty": "Username cannot be empty",
          "any.required": "Username is required",
        }),
  
      email: Joi.string()
        .email()
        .min(6)
        .max(20)
        .messages({
          "string.base": "Email must be a string",
          "string.email": "Email must be a valid email address",
          "string.min": "Email must be at least 6 characters",
          "string.max": "Email must not exceed 20 characters",
          "any.required": "Email is required",
        }),
  
      password: Joi.string()
        .min(6)
        .max(100)
        .messages({
          "string.base": "Password must be a string",
          "string.min": "Password must be at least 6 characters",
          "string.max": "Password must not exceed 100 characters",
          "string.empty": "Password cannot be empty",
          "any.required": "Password is required",
        }),
    });
  
    const { error } = userSchema.validate(req.body);
  
    if (error) {
      return res.status(409).json({ message: error.details[0].message });
    }
  
    next();
  };



const validatePutUser = (req, res, next) => {
  const userSchema = Joi.object({
    username: Joi.string()
      .min(4)
      .max(20)
      .optional()
      .messages({
        "string.base": "Username must be a string",
        "string.min": "Username must be at least 4 characters",
        "string.max": "Username must not exceed 20 characters",
        "string.empty": "Username cannot be empty",
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

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};



export { validatePostUser, validatePutUser };