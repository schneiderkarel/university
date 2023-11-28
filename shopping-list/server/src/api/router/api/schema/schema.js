import Joi from 'joi';

export const idSchema = Joi.string().uuid({ version: 'uuidv4' }).required();

export const userSchema = Joi.object({
  id: idSchema,
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone_number: Joi.string().required(),
});
