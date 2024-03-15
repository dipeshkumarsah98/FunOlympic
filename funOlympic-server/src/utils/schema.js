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
    "string.min": `"password" should have a minimum length of {#limit}`,
    "string.empty": `"password" cannot be an empty field`,
  }),
});

const login = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "string.email": `"email" should be a type of 'email'`,
  }),
  password: Joi.string().required().min(8).required().messages({
    "string.min": `"password" should have a minimum length of {#limit}`,
    "string.empty": `"password" cannot be an empty field`,
  }),
});

const categoryCreate = Joi.object().keys({
  sport: Joi.string().required().messages({
    "any.required": `"sport" is a required field`,
  }),
  description: Joi.string().required().messages({
    "any.required": `"description" is a required field`,
  }),
});

const categoryUpdate = Joi.object().keys({
  sport: Joi.string().messages({
    "any.required": `"sport" is a required field`,
  }),
  description: Joi.string().messages({
    "any.required": `"description" is a required field`,
  }),
});

const eventCreate = Joi.object().keys({
  title: Joi.string().required().messages({
    "any.required": `"title" is a required field`,
  }),
  description: Joi.string().required().messages({
    "any.required": `"description" is a required field`,
  }),
  thumbnail: Joi.string().required().messages({
    "any.required": `"thumbnail" is a required field`,
  }),
  published: Joi.bool().required().messages({
    "any.required": `"published" is a required field`,
  }),

  liveChatEnabled: Joi.bool().required().messages({
    "any.required": `"liveChatEnabled" is a required field`,
  }),

  streamLink: Joi.string().required().messages({
    "any.required": `"steamLink" is a required field`,
  }),

  categoryId: Joi.string().required().messages({
    "any.required": `"categoryId" is a required field`,
  }),

  time: Joi.string().messages({
    "any.required": `"time" is a required field`,
  }),
});

const eventUpdate = Joi.object().keys({
  title: Joi.string().messages({
    "any.required": `"title" is a required field`,
  }),
  description: Joi.string().messages({
    "any.required": `"description" is a required field`,
  }),
  thumbnail: Joi.string().messages({
    "any.required": `"thumbnail" is a required field`,
  }),
  published: Joi.bool().messages({
    "any.required": `"published" is a required field`,
  }),

  liveChatEnabled: Joi.bool().messages({
    "any.required": `"liveChatEnabled" is a required field`,
  }),

  streamLink: Joi.string().messages({
    "any.required": `"steamLink" is a required field`,
  }),

  categoryId: Joi.string().messages({
    "any.required": `"categoryId" is a required field`,
  }),

  time: Joi.string().messages({
    "any.required": `"time" is a required field`,
  }),
});

export default {
  "/auth/signin": login,
  "/auth/signup": register,
  "/category/create": categoryCreate,
  "/category/update": categoryUpdate,
  "/event/create": eventCreate,
  "/event/update": eventUpdate,
};
