import Router from 'koa-joi-router';
import Joi from 'joi';

const monitoringRouter = Router();

monitoringRouter.route({
  method: 'get',
  path: '/status',
  validate: {
    output: {
      200: {
        body: Joi.string().allow(''),
      },
    },
  },
  handler: async (ctx) => {
    ctx.body = '';
  },
});

export default monitoringRouter;
