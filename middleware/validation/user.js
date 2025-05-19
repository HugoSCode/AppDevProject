import Joi from "joi";

const validRoles= ["ADMIN", "SUPER_ADMIN", "NORMAL"];

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

         role: Joi.string()
              .max(20)  // Max length of the string
              .required()  // Must be present
              .valid(...validRoles)  // Must be one of the valid enum values
              .messages({
                "string.base": "Role must be a string",
                "string.max": "Role must not exceed 20 characters",
                "any.required": "Role is required",
                "any.only": "Role must be one of the following: ADMIN, SUPER_ADMIN, NORMAL",
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

      role: Joi.string()
      .max(20)  // Max length of the string
      .required()  // Must be present
      .valid(...validRoles)  // Must be one of the valid enum values
      .messages({
        "string.base": "Role must be a string",
        "string.max": "Role must not exceed 20 characters",
        "any.required": "Role is required",
        "any.only": "Role must be one of the following: ADMIN, SUPER_ADMIN, NORMAL",
      }),
  }).min(1); // Require at least one field to be updated

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};



export { validatePostUser, validatePutUser };