import Joi from "joi";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const register = Joi.object().keys({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `"email" should be a type of 'email'`,
  }),
  phone: Joi.string().required().min(10).max(10),
  country: Joi.string().required(),
  sport: Joi.string().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required().messages({
    "string.min": `"password" should have a minimun lengt of {#limit}`,
    "string.empty": `"password" cannot be an empty field`,
  }),
});

const login = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "string.email": `"email" should be a type of 'email'`,
  }),
  password: Joi.string().required().min(8).required().messages({
    "string.min": `"password" should have a minimun lengt of {#limit}`,
    "string.empty": `"password" cannot be an empty field`,
  }),
});

export default {
  "/auth/signin": login,
  "/auth/signup": register,
};
