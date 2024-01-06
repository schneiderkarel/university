import KoaJoiRouter from 'koa-joi-router';
import Joi from 'joi';

class Router {
  router;

  constructor() {
    const router = KoaJoiRouter();

    router.route({
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

    this.router = router;
  }

  middleware() {
    return this.router.middleware();
  }
}

export default Router;
