import Koa from 'koa';
import request from 'supertest';
import Router from './router.js';

describe('monitoring router', () => {
  const app = new Koa();
  const router = new Router();
  app.use(router.middleware());

  describe('get - /health', () => {
    test('get', async () => {
      const response = await request(app.callback()).get('/status').set({ caller: '659973f4d0493bc5a4e4279d' });

      expect(response.status).toStrictEqual(200);
      expect(response.body).toStrictEqual({});
    });
  });
});
