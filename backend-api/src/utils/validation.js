import Joi from 'joi'

  export const loginSchema = Joi.object({
    email: Joi.string().email().required()
      .messages({
        'any.required': 'email is required'
      }),
    password: Joi.string().min(7)
      .required()
      .messages({
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 7 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        'any.required': 'Password is required',
      })
  });