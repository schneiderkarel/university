import KoaJoiRouter from 'koa-joi-router';
import Joi from 'joi';
import {
  idSchema,
  userSchema,
  usersSchema,
  shoppingListSchemaIn,
  shoppingListSchemaOut,
} from './schema/schema.js';

class Router {
  router;

  constructor(controller) {
    const router = KoaJoiRouter();

    router.route({
      method: 'get',
      path: '/users',
      validate: {
        header: Joi.object({
          caller: idSchema.required(),
        }).options({
          allowUnknown: true,
        }).required(),
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

    router.route({
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

    router.route({
      method: 'get',
      path: '/users/:id',
      validate: {
        params: {
          id: idSchema.required(),
        },
        header: Joi.object({
          caller: idSchema.required(),
        }).options({
          allowUnknown: true,
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
        await controller.user(ctx);
      },
    });

    router.route({
      method: 'post',
      path: '/shopping-lists',
      validate: {
        header: Joi.object({
          caller: idSchema.required(),
        }).options({
          allowUnknown: true,
        }).required(),
        type: 'json',
        body: shoppingListSchemaIn.required(),
        output: {
          200: {
            body: Joi.object({
              data: shoppingListSchemaOut.required(),
            }),
          },
        },
      },
      handler: async (ctx) => {
        await controller.createShoppingList(ctx);
      },
    });

    router.route({
      method: 'get',
      path: '/shopping-lists/:id',
      validate: {
        params: {
          id: idSchema.required(),
        },
        header: Joi.object({
          caller: idSchema.required(),
        }).options({
          allowUnknown: true,
        }).required(),
        output: {
          200: {
            body: Joi.object({
              data: shoppingListSchemaOut.required(),
            }),
          },
        },
      },
      handler: async (ctx) => {
        await controller.shoppingList(ctx);
      },
    });

    router.route({
      method: 'patch',
      path: '/shopping-lists/:id',
      validate: {
        params: {
          id: idSchema.required(),
        },
        header: Joi.object({
          caller: idSchema.required(),
        }).options({
          allowUnknown: true,
        }).required(),
        type: 'json',
        body: shoppingListSchemaIn.required(),
        output: {
          200: {
            body: Joi.object({
              data: shoppingListSchemaOut.required(),
            }),
          },
        },
      },
      handler: async (ctx) => {
        await controller.updateShoppingList(ctx);
      },
    });

    router.route({
      method: 'delete',
      path: '/shopping-lists/:id',
      validate: {
        params: {
          id: idSchema.required(),
        },
        header: Joi.object({
          caller: idSchema.required(),
        }).options({
          allowUnknown: true,
        }).required(),
        output: {
          204: {
            body: Joi.string().allow('').empty().required(),
          },
        },
      },
      handler: async (ctx) => {
        await controller.removeShoppingList(ctx);
      },
    });

    router.route({
      method: 'delete',
      path: '/shopping-lists/:id/leave',
      validate: {
        params: {
          id: idSchema.required(),
        },
        header: Joi.object({
          caller: idSchema.required(),
        }).options({
          allowUnknown: true,
        }).required(),
        output: {
          204: {
            body: Joi.string().allow('').empty().required(),
          },
        },
      },
      handler: async (ctx) => {
        await controller.leaveShoppingList(ctx);
      },
    });

    this.router = router;
  }

  middleware() {
    return this.router.middleware();
  }
}

export default Router;
