import Joi from 'joi';

export const idSchema = Joi.string().hex().length(24);

export const usersSchema = Joi.object({
  id: idSchema.required(),
  name: Joi.string().required(),
});

export const shoppingListInviteeSchema = Joi.object({
  id: idSchema.required(),
  name: Joi.string().required(),
});

export const shoppingListItemSchema = Joi.object({
  id: idSchema.required(),
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  resolved: Joi.boolean().required(),
});

export const userSchema = Joi.object({
  id: idSchema.required(),
  name: Joi.string().required(),
  shoppingLists: Joi.array().items(
    Joi.object({
      id: idSchema.required(),
      name: Joi.string().required(),
      image: Joi.string().required(),
      role: Joi.string().valid('owner', 'invitee').required(),
      description: Joi.string().required(),
      archived: Joi.boolean().required(),
      invitees: Joi.array().items(shoppingListInviteeSchema).required(),
      items: Joi.array().items(shoppingListItemSchema).required(),
    }),
  ).required(),
});
