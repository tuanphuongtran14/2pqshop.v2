const Joi = require('joi');

module.exports = {
  signUpSchema: (params) => {
    const schema = Joi.object({
      firstName: Joi.string().max(256).required(),
      lastName: Joi.string().max(256).required(),
      password: Joi.string().min(8).max(128).required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required()
        .messages({
          'any.only': 'Passwords must match',
        }),
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      phone: Joi.string().length(10).regex(/^\d+$/).required(),
      gender: Joi.string().valid('MALE', 'FEMALE').required(),
      isConfirm: Joi.forbidden(),
      confirmToken: Joi.forbidden(),
      resetPwToken: Joi.forbidden(),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },

  signInSchema: (params) => {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().max(128).required(),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },

  resendEmailConfirmationSchema: (params) => {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }).required(),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },

  forgetPasswordSchema: (params) => {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }).required(),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },

  resetPasswordSchema: (params) => {
    const schema = Joi.object({
      code: Joi.string().required(),
      newPassword: Joi.string().min(8).max(128).required(),
      confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required()
        .messages({
          'any.only': 'Passwords must match',
        }),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },

  changePasswordSchema: (params) => {
    const schema = Joi.object({
      currentPassword: Joi.string().max(128).required(),
      newPassword: Joi.string().min(8).max(128).required(),
      confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required()
        .messages({
          'any.only': 'Passwords must match',
        }),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },
};
