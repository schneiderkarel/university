import Router from 'koa-joi-router';
import Joi from 'joi';
import Controller from '../../controller/controller.js';
import Storage from '../../../service/storage/storage.js';
import { idSchema, userSchema, usersSchema } from './schema/schema.js';

const apiRouter = Router();

const storage = new Storage(process.env.DB_DSN);
const controller = new Controller(storage);

apiRouter.route({
  method: 'get',
  path: '/users',
  validate: {
    output: {
      200: {
        body: Joi.object({
          data: Joi.array().items(usersSchema).required(),
        }),
      },
    },
  },
  handler: async (ctx) => {
    await controller.users(ctx);
  },
});

apiRouter.route({
  method: 'post',
  path: '/users',
  validate: {
    type: 'json',
    body: Joi.object({
      name: Joi.string().required(),
    }).required(),
    output: {
      200: {
        body: Joi.object({
          data: userSchema.required(),
        }),
      },
    },
  },
  handler: async (ctx) => {
    await controller.createUser(ctx);
  },
});

apiRouter.route({
  method: 'get',
  path: '/users/:id',
  validate: {
    params: {
      id: idSchema.required()
    },
    output: {
      200: {
        body: Joi.object({
          data: userSchema.required(),
        }),
      },
    },
  },
  handler: async (ctx) => {
    await controller.user(ctx);
  },
});

export default apiRouter;
