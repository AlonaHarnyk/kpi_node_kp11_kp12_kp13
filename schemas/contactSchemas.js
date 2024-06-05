import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});


export const updateContactSchema = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email(),
  });
  