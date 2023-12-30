import Joi from 'joi';

export const idSchema = Joi.string().hex().length(24);

export const usersSchema = Joi.object({
  id: idSchema.required(),
  name: Joi.string().required(),
});

export const userSchema = Joi.object({
  id: idSchema.required(),
  name: Joi.string().required(),
  shoppingLists: Joi.array().items(
    Joi.object({
      id: idSchema.required(),
    }),
  ).required(),
});

const shoppingListInviteesSchemaIn = Joi.object({
  id: idSchema.required(),
});

const shoppingListInviteesSchemaOut = Joi.object({
  id: idSchema.required(),
  name: Joi.string().required(),
});

const shoppingListItemsSchemaIn = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.string().required(),
  resolved: Joi.boolean().required(),
});

const shoppingListItemsSchemaOut = Joi.object({
  id: idSchema.required(),
  name: Joi.string().required(),
  quantity: Joi.string().required(),
  resolved: Joi.boolean().required(),
});

export const shoppingListSchemaIn = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
  description: Joi.string().required(),
  archived: Joi.boolean().required(),
  invitees: Joi.array().items(shoppingListInviteesSchemaIn).required(),
  items: Joi.array().items(shoppingListItemsSchemaIn).required(),
});

export const shoppingListSchemaOut = Joi.object({
  id: idSchema.required(),
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
  role: Joi.string().valid('owner', 'invitee').required(),
  description: Joi.string().required(),
  archived: Joi.boolean().required(),
  invitees: Joi.array().items(shoppingListInviteesSchemaOut).required(),
  items: Joi.array().items(shoppingListItemsSchemaOut).required(),
});
