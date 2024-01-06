import Koa from 'koa';
import request from 'supertest';
import Controller from '../../controller/controller.js';
import Router from './router.js';

jest.mock('../../controller/controller.js');

describe('api router', () => {
  const controller = new Controller();

  const app = new Koa();
  const router = new Router(controller);

  app.use(router.middleware());

  describe('get - /users', () => {
    test.each([
      {
        name: 'ok',
        args: {
          request: async () => request(app.callback())
            .get('/users')
            .set({ caller: '659973f4d0493bc5a4e4279d' }),
          mock: {
            controller: () => {
              controller.users.mockImplementation((args) => {
                args.body = { data: [{ id: '659973f4d0493bc5a4e4279d', name: 'John' }] };
              });
            },
          },
        },
        exp: {
          result: {
            body: {
              data: [{ id: '659973f4d0493bc5a4e4279d', name: 'John' }],
            },
          },
          status: 200,
        },
      },
      {
        name: 'empty',
        args: {
          request: async () => request(app.callback())
            .get('/users')
            .set({ caller: '659973f4d0493bc5a4e4279d' }),
          mock: {
            controller: () => {
              controller.users.mockImplementation((args) => {
                args.body = { data: [] };
              });
            },
          },
        },
        exp: {
          result: {
            body: {
              data: [],
            },
          },
          status: 200,
        },
      },
      {
        name: 'missing caller header',
        args: {
          request: async () => request(app.callback())
            .get('/users'),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"caller" is required',
          status: 400,
        },
      },
      {
        name: 'unknown error',
        args: {
          request: async () => request(app.callback())
            .get('/users')
            .set({ caller: '659973f4d0493bc5a4e4279d' }),
          mock: {
            controller: () => {
              controller.users.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
      {
        name: 'data missing in the response',
        args: {
          request: async () => request(app.callback())
            .get('/users')
            .set({ caller: '659973f4d0493bc5a4e4279d' }),
          mock: {
            controller: () => {
              controller.users.mockImplementation((args) => {
                args.body = { data: [{ id: '659973f4d0493bc5a4e4279d' }] };
              });
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.controller();

      const response = await args.request();

      expect(response.status).toStrictEqual(exp.status);
      expect(response.body).toStrictEqual(exp.result.body);

      if (response.error.text) {
        expect(response.error.text).toStrictEqual(exp.error);
      }
    });
  });

  describe('post - /users', () => {
    test.each([
      {
        name: 'ok',
        args: {
          request: async () => request(app.callback())
            .post('/users')
            .send({
              name: 'John',
            })
            .set({
              Accept: 'application/json',
            }),
          mock: {
            controller: () => {
              controller.createUser.mockImplementation((args) => {
                args.body = {
                  data: {
                    id: '659973f4d0493bc5a4e4279d',
                    name: args.request.body.name,
                    shoppingLists: [],
                  },
                };
              });
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '659973f4d0493bc5a4e4279d',
                name: 'John',
                shoppingLists: [],
              },
            },
          },
          status: 200,
        },
      },
      {
        name: 'bad request error',
        args: {
          request: async () => request(app.callback())
            .post('/users')
            .send({})
            .set({
              Accept: 'application/json',
            }),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"name" is required',
          status: 400,
        },
      },
      {
        name: 'bad request error - expected json',
        args: {
          request: async () => request(app.callback()).post('/users'),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'expected json',
          status: 400,
        },
      },
      {
        name: 'unknown error',
        args: {
          request: async () => request(app.callback())
            .post('/users')
            .send({
              name: 'John',
            })
            .set({
              Accept: 'application/json',
            }),
          mock: {
            controller: () => {
              controller.createUser.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
      {
        name: 'data missing in the response',
        args: {
          request: async () => request(app.callback())
            .post('/users')
            .send({
              name: 'John',
            })
            .set({
              Accept: 'application/json',
            }),
          mock: {
            controller: () => {
              controller.createUser.mockImplementation((args) => {
                args.body = {
                  data: {
                    id: '659973f4d0493bc5a4e4279d',
                  },
                };
              });
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.controller();

      const response = await args.request();

      expect(response.status).toStrictEqual(exp.status);
      expect(response.body).toStrictEqual(exp.result.body);

      if (response.error.text) {
        expect(response.error.text).toStrictEqual(exp.error);
      }
    });
  });

  describe('get - /users/:id', () => {
    test.each([
      {
        name: 'ok',
        args: {
          request: async () => request(app.callback())
            .get('/users/659973f4d0493bc5a4e4279d')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.user.mockImplementation((args) => {
                args.body = {
                  data: {
                    id: args.params.id,
                    name: 'John',
                    shoppingLists: [],
                  },
                };
              });
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '659973f4d0493bc5a4e4279d',
                name: 'John',
                shoppingLists: [],
              },
            },
          },
          status: 200,
        },
      },
      {
        name: 'bad request error - invalid param',
        args: {
          request: async () => request(app.callback())
            .get('/users/:id')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"id" must only contain hexadecimal characters',
          status: 400,
        },
      },
      {
        name: 'missing caller header',
        args: {
          request: async () => request(app.callback())
            .get('/users/659973f4d0493bc5a4e4279d'),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"caller" is required',
          status: 400,
        },
      },
      {
        name: 'unknown error',
        args: {
          request: async () => request(app.callback())
            .get('/users/659973f4d0493bc5a4e4279d')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.user.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
      {
        name: 'data missing in the response',
        args: {
          request: async () => request(app.callback())
            .get('/users/659973f4d0493bc5a4e4279d')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.user.mockImplementation((args) => {
                args.body = {
                  data: {
                    id: args.params.id,
                    name: 'John',
                  },
                };
              });
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.controller();

      const response = await args.request();

      expect(response.status).toStrictEqual(exp.status);
      expect(response.body).toStrictEqual(exp.result.body);

      if (response.error.text) {
        expect(response.error.text).toStrictEqual(exp.error);
      }
    });
  });

  describe('post - /shopping-lists', () => {
    test.each([
      {
        name: 'ok',
        args: {
          request: async () => request(app.callback())
            .post('/shopping-lists')
            .send({
              name: 'name',
              image: 'http://image.com',
              description: 'description',
              archived: false,
              invitees: [
                {
                  id: '659973f4d0493bc5a4e4279d',
                },
              ],
              items: [
                {
                  name: 'name',
                  quantity: '1',
                  resolved: true,
                },
              ],
            })
            .set({
              caller: '659973f4d0493bc5a4e4279d',
              Accept: 'application/json',
            }),
          mock: {
            controller: () => {
              controller.createShoppingList.mockImplementation((args) => {
                args.body = {
                  data: {
                    id: '659973f4d0493bc5a4e4279d',
                    name: args.request.body.name,
                    image: args.request.body.image,
                    role: 'owner',
                    description: args.request.body.description,
                    archived: args.request.body.archived,
                    invitees: args.request.body.invitees.map((invitee) => ({
                      id: invitee.id,
                      name: 'Frank',
                    })),
                    items: args.request.body.items.map((item) => ({
                      id: '659973f4d0493bc5a4e4279d',
                      name: item.name,
                      quantity: item.quantity,
                      resolved: item.resolved,
                    })),
                  },
                };
              });
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '659973f4d0493bc5a4e4279d',
                name: 'name',
                image: 'http://image.com',
                role: 'owner',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '659973f4d0493bc5a4e4279d',
                    name: 'Frank',
                  },
                ],
                items: [
                  {
                    id: '659973f4d0493bc5a4e4279d',
                    name: 'name',
                    quantity: '1',
                    resolved: true,
                  },
                ],
              },
            },
          },
          status: 200,
        },
      },
      {
        name: 'missing caller header',
        args: {
          request: async () => request(app.callback())
            .post('/shopping-lists')
            .send({
              image: 'http://image.com',
              description: 'description',
              archived: false,
              invitees: [
                {
                  id: '659973f4d0493bc5a4e4279d',
                },
              ],
              items: [],
            })
            .set({
              Accept: 'application/json',
            }),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"caller" is required',
          status: 400,
        },
      },
      {
        name: 'bad request',
        args: {
          request: async () => request(app.callback())
            .post('/shopping-lists')
            .send({
              image: 'http://image.com',
              description: 'description',
              archived: false,
              invitees: [
                {
                  id: '659973f4d0493bc5a4e4279d',
                },
              ],
              items: [],
            })
            .set({
              caller: '659973f4d0493bc5a4e4279d',
              Accept: 'application/json',
            }),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"name" is required',
          status: 400,
        },
      },
      {
        name: 'bad request - expected json',
        args: {
          request: async () => request(app.callback())
            .post('/shopping-lists')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'expected json',
          status: 400,
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.controller();

      const response = await args.request();

      expect(response.body).toStrictEqual(exp.result.body);

      if (response.error.text) {
        expect(response.error.text).toStrictEqual(exp.error);
      }
    });
  });

  describe('patch - /shopping-lists/:id', () => {
    test.each([
      {
        name: 'ok',
        args: {
          request: async () => request(app.callback())
            .get('/shopping-lists/659973f4d0493bc5a4e4279d')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.shoppingList.mockImplementation((args) => {
                args.body = {
                  data: {
                    id: '659973f4d0493bc5a4e4279d',
                    name: 'name',
                    image: 'http://image.com',
                    role: 'owner',
                    description: 'description',
                    archived: false,
                    invitees: [
                      {
                        id: '659973f4d0493bc5a4e4279d',
                        name: 'Frank',
                      },
                    ],
                    items: [
                      {
                        id: '659973f4d0493bc5a4e4279d',
                        name: 'name',
                        quantity: 'quantity',
                        resolved: true,
                      },
                    ],
                  },
                };
              });
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '659973f4d0493bc5a4e4279d',
                name: 'name',
                image: 'http://image.com',
                role: 'owner',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '659973f4d0493bc5a4e4279d',
                    name: 'Frank',
                  },
                ],
                items: [
                  {
                    id: '659973f4d0493bc5a4e4279d',
                    name: 'name',
                    quantity: 'quantity',
                    resolved: true,
                  },
                ],
              },
            },
          },
          status: 200,
        },
      },
      {
        name: 'bad request error - invalid param',
        args: {
          request: async () => request(app.callback())
            .get('/shopping-lists/:id')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"id" must only contain hexadecimal characters',
          status: 400,
        },
      },
      {
        name: 'missing caller header',
        args: {
          request: async () => request(app.callback())
            .get('/shopping-lists/659973f4d0493bc5a4e4279d'),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"caller" is required',
          status: 400,
        },
      },
      {
        name: 'unknown error',
        args: {
          request: async () => request(app.callback())
            .get('/shopping-lists/659973f4d0493bc5a4e4279d')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.shoppingList.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
      {
        name: 'data missing in the response',
        args: {
          request: async () => request(app.callback())
            .get('/shopping-lists/659973f4d0493bc5a4e4279d')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.shoppingList.mockImplementation((args) => {
                args.body = {
                  data: {
                    id: args.params.id,
                    name: 'John',
                  },
                };
              });
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.controller();

      const response = await args.request();

      expect(response.status).toStrictEqual(exp.status);
      expect(response.body).toStrictEqual(exp.result.body);

      if (response.error.text) {
        expect(response.error.text).toStrictEqual(exp.error);
      }
    });

    describe('patch - /shopping-lists/:id', () => {
      test.each([
        {
          name: 'ok',
          args: {
            request: async () => request(app.callback())
              .patch('/shopping-lists/659973f4d0493bc5a4e4279d')
              .send({
                name: 'name',
                image: 'http://image.com',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '659973f4d0493bc5a4e4279d',
                  },
                ],
                items: [
                  {
                    name: 'name',
                    quantity: '1',
                    resolved: true,
                  },
                ],
              })
              .set({
                caller: '659973f4d0493bc5a4e4279d',
                Accept: 'application/json',
              }),
            mock: {
              controller: () => {
                controller.updateShoppingList.mockImplementation((args) => {
                  args.body = {
                    data: {
                      id: args.params.id,
                      name: args.request.body.name,
                      image: args.request.body.image,
                      role: 'owner',
                      description: args.request.body.description,
                      archived: args.request.body.archived,
                      invitees: args.request.body.invitees.map((invitee) => ({
                        id: invitee.id,
                        name: 'Frank',
                      })),
                      items: args.request.body.items.map((item) => ({
                        id: '659973f4d0493bc5a4e4279d',
                        name: item.name,
                        quantity: item.quantity,
                        resolved: item.resolved,
                      })),
                    },
                  };
                });
              },
            },
          },
          exp: {
            result: {
              body: {
                data: {
                  id: '659973f4d0493bc5a4e4279d',
                  name: 'name',
                  image: 'http://image.com',
                  role: 'owner',
                  description: 'description',
                  archived: false,
                  invitees: [
                    {
                      id: '659973f4d0493bc5a4e4279d',
                      name: 'Frank',
                    },
                  ],
                  items: [
                    {
                      id: '659973f4d0493bc5a4e4279d',
                      name: 'name',
                      quantity: '1',
                      resolved: true,
                    },
                  ],
                },
              },
            },
            status: 200,
          },
        },
        {
          name: 'missing caller header',
          args: {
            request: async () => request(app.callback())
              .patch('/shopping-lists/:659973f4d0493bc5a4e4279d')
              .send({
                image: 'http://image.com',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '659973f4d0493bc5a4e4279d',
                  },
                ],
                items: [],
              })
              .set({
                Accept: 'application/json',
              }),
            mock: {
              controller: () => {},
            },
          },
          exp: {
            result: {
              body: {},
            },
            error: '"caller" is required',
            status: 400,
          },
        },
        {
          name: 'bad request',
          args: {
            request: async () => request(app.callback())
              .patch('/shopping-lists/659973f4d0493bc5a4e4279d')
              .send({
                image: 'http://image.com',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '659973f4d0493bc5a4e4279d',
                  },
                ],
                items: [],
              })
              .set({
                caller: '659973f4d0493bc5a4e4279d',
                Accept: 'application/json',
              }),
            mock: {
              controller: () => {},
            },
          },
          exp: {
            result: {
              body: {},
            },
            error: '"name" is required',
            status: 400,
          },
        },
        {
          name: 'bad request - invalid param',
          args: {
            request: async () => request(app.callback())
              .patch('/shopping-lists/:id')
              .send({
                image: 'http://image.com',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '659973f4d0493bc5a4e4279d',
                  },
                ],
                items: [],
              })
              .set({
                caller: '659973f4d0493bc5a4e4279d',
                Accept: 'application/json',
              }),
            mock: {
              controller: () => {},
            },
          },
          exp: {
            result: {
              body: {},
            },
            error: '"id" must only contain hexadecimal characters',
            status: 400,
          },
        },
        {
          name: 'bad request - expected json',
          args: {
            request: async () => request(app.callback())
              .patch('/shopping-lists/659973f4d0493bc5a4e4279d')
              .set({
                caller: '659973f4d0493bc5a4e4279d',
              }),
            mock: {
              controller: () => {},
            },
          },
          exp: {
            result: {
              body: {},
            },
            error: 'expected json',
            status: 400,
          },
        },
      ])('$name', async ({ args, exp }) => {
        args.mock.controller();

        const response = await args.request();

        expect(response.body).toStrictEqual(exp.result.body);

        if (response.error.text) {
          expect(response.error.text).toStrictEqual(exp.error);
        }
      });
    });
  });

  describe('delete - /shopping-lists/:id', () => {
    test.each([
      {
        name: 'ok',
        args: {
          request: async () => request(app.callback())
            .delete('/shopping-lists/659973f4d0493bc5a4e4279d')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.removeShoppingList.mockImplementation((args) => {
                args.body = '';
                args.status = 204;
              });
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          status: 204,
        },
      },
      {
        name: 'bad request error - invalid param',
        args: {
          request: async () => request(app.callback())
            .delete('/shopping-lists/:id')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"id" must only contain hexadecimal characters',
          status: 400,
        },
      },
      {
        name: 'missing caller header',
        args: {
          request: async () => request(app.callback())
            .delete('/shopping-lists/659973f4d0493bc5a4e4279d'),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"caller" is required',
          status: 400,
        },
      },
      {
        name: 'unknown error',
        args: {
          request: async () => request(app.callback())
            .delete('/shopping-lists/659973f4d0493bc5a4e4279d')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.removeShoppingList.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.controller();

      const response = await args.request();

      expect(response.status).toStrictEqual(exp.status);
      expect(response.body).toStrictEqual(exp.result.body);

      if (response.error.text) {
        expect(response.error.text).toStrictEqual(exp.error);
      }
    });
  });

  describe('delete - /shopping-lists/:id/leave', () => {
    test.each([
      {
        name: 'ok',
        args: {
          request: async () => request(app.callback())
            .delete('/shopping-lists/659973f4d0493bc5a4e4279d/leave')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.leaveShoppingList.mockImplementation((args) => {
                args.body = '';
                args.status = 204;
              });
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          status: 204,
        },
      },
      {
        name: 'bad request error - invalid param',
        args: {
          request: async () => request(app.callback())
            .delete('/shopping-lists/:id/leave')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"id" must only contain hexadecimal characters',
          status: 400,
        },
      },
      {
        name: 'missing caller header',
        args: {
          request: async () => request(app.callback())
            .delete('/shopping-lists/659973f4d0493bc5a4e4279d/leave'),
          mock: {
            controller: () => {},
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: '"caller" is required',
          status: 400,
        },
      },
      {
        name: 'unknown error',
        args: {
          request: async () => request(app.callback())
            .delete('/shopping-lists/659973f4d0493bc5a4e4279d/leave')
            .set({
              caller: '659973f4d0493bc5a4e4279d',
            }),
          mock: {
            controller: () => {
              controller.leaveShoppingList.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          result: {
            body: {},
          },
          error: 'Internal Server Error',
          status: 500,
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.controller();

      const response = await args.request();

      expect(response.status).toStrictEqual(exp.status);
      expect(response.body).toStrictEqual(exp.result.body);

      if (response.error.text) {
        expect(response.error.text).toStrictEqual(exp.error);
      }
    });
  });
});
