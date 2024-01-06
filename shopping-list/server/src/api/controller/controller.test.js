import Controller from './controller.js';
import Storage from '../../service/storage/storage.js';
import UserNotFoundError from '../../model/error/userNotFoundError.js';
import BadRequestError from '../../model/error/badRequestError.js';
import ShoppingListNotFoundError from '../../model/error/shoppingListNotFoundError.js';

jest.mock('../../service/storage/storage.js');

describe('controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const storage = new Storage()
  const controller = new Controller(storage);

  describe('users', () => {
    test.each([
      {
        name: 'ok - full',
        args: {
          ctx: {
            body: null,
          },
          mock: {
            storage: () => {
              storage.users.mockResolvedValue([
                {
                  id: '1',
                  name: 'John',
                },
                {
                  id: '2',
                  name: 'Barbara',
                },
              ]);
            },
          },
        },
        exp: {
          result: {
            body: {
              data: [
                {
                  id: '1',
                  name: 'John',
                },
                {
                  id: '2',
                  name: 'Barbara',
                },
              ],
            },
          },
        },
      },
      {
        name: 'ok - empty',
        args: {
          ctx: {
            body: null,
          },
          mock: {
            storage: () => {
              storage.users.mockResolvedValue([]);
            },
          },
        },
        exp: {
          result: {
            body: {
              data: [],
            },
          },
        },
      },
      {
        name: 'unknown error',
        args: {
          ctx: {
            body: null,
          },
          mock: {
            storage: () => {
              storage.users.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.storage();

      try {
        await controller.users(args.ctx);
        expect(args.ctx.body).toStrictEqual(exp.result.body);
      } catch (error) {
        expect(error).toEqual(exp.error);
      }
    });
  });

  describe('user', () => {
    test.each([
      {
        name: 'ok',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                    name: 'Shopping list #1',
                    archived: true,
                  },
                ],
              }));
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '1',
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                    name: 'Shopping list #1',
                    archived: true,
                  },
                ],
              },
            },
          },
        },
      },
      {
        name: 'user not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new UserNotFoundError());
            },
          },
        },
        exp: {
          error: new UserNotFoundError(),
        },
      },
      {
        name: 'user shopping list not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new ShoppingListNotFoundError());
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'user unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.storage();

      try {
        await controller.user(args.ctx);
        expect(args.ctx.body).toStrictEqual(exp.result.body);
      } catch (error) {
        expect(error).toEqual(exp.error);
      }
    });
  });

  describe('create user', () => {
    test.each([
      {
        name: 'ok',
        args: {
          ctx: {
            request: {
              body: {
                name: 'John',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.createUser.mockImplementation((args) => ({
                id: '1',
                name: args.name,
                shoppingLists: args.shoppingLists,
              }));
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '1',
                name: 'John',
                shoppingLists: [],
              },
            },
          },
        },
      },
      {
        name: 'create user unknown error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'John',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.createUser.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.storage();

      try {
        await controller.createUser(args.ctx);
        expect(args.ctx.body).toStrictEqual(exp.result.body);
      } catch (error) {
        expect(error).toEqual(exp.error);
      }
    });
  });

  describe('shopping list', () => {
    test.each([
      {
        name: 'ok - as owner',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                    name: 'Shopping list #1',
                    archived: true,
                  },
                ],
              }));

              storage.shoppingList.mockImplementation(() => ({
                id: '1',
                name: 'Shopping list #1',
                archived: true,
                invitees: [
                  {
                    id: '2',
                  },
                ],
              }));
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '1',
                name: 'Shopping list #1',
                archived: true,
                role: 'owner',
                invitees: [
                  {
                    id: '2',
                  },
                ],
              },
            },
          },
        },
      },
      {
        name: 'ok - as invitee',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '2',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation(() => ({
                id: '2',
                name: 'Frank',
                shoppingLists: [
                  {
                    id: '1',
                    name: 'Shopping list #1',
                    archived: true,
                  },
                ],
              }));

              storage.shoppingList.mockImplementation(() => ({
                id: '1',
                name: 'Shopping list #1',
                archived: true,
                invitees: [
                  {
                    id: '2',
                  },
                ],
              }));
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '1',
                name: 'Shopping list #1',
                archived: true,
                role: 'invitee',
                invitees: [
                  {
                    id: '2',
                  },
                ],
              },
            },
          },
        },
      },
      {
        name: 'user not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new UserNotFoundError());
            },
          },
        },
        exp: {
          error: new UserNotFoundError(),
        },
      },
      {
        name: 'user shopping list not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new ShoppingListNotFoundError());
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'user unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'user does not have shopping list error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '2',
                    name: 'Shopping list #2',
                    archived: true,
                  },
                ],
              }));
            },
          },
        },
        exp: {
          error: new BadRequestError('User does not have this shopping list'),
        },
      },
      {
        name: 'shopping list not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                    name: 'Shopping list #1',
                    archived: true,
                  },
                ],
              }));

              storage.shoppingList.mockRejectedValue(new ShoppingListNotFoundError());
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'shopping list unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                    name: 'Shopping list #1',
                    archived: true,
                  },
                ],
              }));

              storage.shoppingList.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.storage();

      try {
        await controller.shoppingList(args.ctx);
        expect(args.ctx.body).toStrictEqual(exp.result.body);
      } catch (error) {
        expect(error).toEqual(exp.error);
      }
    });
  });

  describe('create shopping list', () => {
    test.each([
      {
        name: 'ok',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [],
                  };
                }

                return {
                  id: args,
                  name: 'Frank',
                  shoppingLists: [],
                };
              });
              storage.createShoppingList.mockImplementation((args) => ({
                id: '1',
                name: args.name,
                image: args.image,
                description: args.description,
                archived: args.archived,
                invitees: args.invitees,
                items: args.items,
              }));
              storage.updateUser.mockImplementation((args, fields) => ({
                id: args,
                name: fields.name,
                shoppingLists: fields.shoppingLists,
              }));
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '1',
                name: 'name',
                image: 'image',
                role: 'owner',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
            },
          },
        },
      },
      {
        name: 'caller cannot be in invitees error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '1',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {},
          },
        },
        exp: {
          error: new BadRequestError('Caller cannot be in invitees'),
        },
      },
      {
        name: 'user not found error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new UserNotFoundError());
            },
          },
        },
        exp: {
          error: new UserNotFoundError(),
        },
      },
      {
        name: 'user shopping list not found error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new ShoppingListNotFoundError());
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'user unknown error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'create shopping list unknown error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [],
              }));
              storage.createShoppingList.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'invitee user not found error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [],
                  };
                }

                throw new UserNotFoundError();
              });
              storage.createShoppingList.mockImplementation((args) => ({
                id: '1',
                name: args.name,
                image: args.image,
                description: args.description,
                archived: args.archived,
                invitees: args.invitees,
                items: args.items,
              }));
            },
          },
        },
        exp: {
          error: new UserNotFoundError(),
        },
      },
      {
        name: 'invitee user shopping list not found error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [],
                  };
                }

                throw new ShoppingListNotFoundError();
              });
              storage.createShoppingList.mockImplementation((args) => ({
                id: '1',
                name: args.name,
                image: args.image,
                description: args.description,
                archived: args.archived,
                invitees: args.invitees,
                items: args.items,
              }));
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'invitee user unknown error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [],
                  };
                }

                throw new Error('unknown error');
              });
              storage.createShoppingList.mockImplementation((args) => ({
                id: '1',
                name: args.name,
                image: args.image,
                description: args.description,
                archived: args.archived,
                invitees: args.invitees,
                items: args.items,
              }));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'invitee update user unknown error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [],
                  };
                }

                return {
                  id: args,
                  name: 'Frank',
                  shoppingLists: [],
                };
              });
              storage.createShoppingList.mockImplementation((args) => ({
                id: '1',
                name: args.name,
                image: args.image,
                description: args.description,
                archived: args.archived,
                invitees: args.invitees,
                items: args.items,
              }));
              storage.updateUser.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'update user unknown error',
        args: {
          ctx: {
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [],
              }));
              storage.createShoppingList.mockImplementation((args) => ({
                id: '1',
                name: args.name,
                image: args.image,
                description: args.description,
                archived: args.archived,
                invitees: args.invitees,
                items: args.items,
              }));
              storage.updateUser.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.storage();

      try {
        await controller.createShoppingList(args.ctx);
        expect(args.ctx.body).toStrictEqual(exp.result.body);
      } catch (error) {
        expect(error).toEqual(exp.error);
      }
    });
  });

  describe('update shopping list', () => {
    test.each([
      {
        name: 'ok',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [
                      {
                        id: '1',
                        name: 'Shopping list #1',
                        archived: true,
                      },
                    ],
                  };
                }

                return {
                  id: args,
                  name: 'Frank',
                  shoppingLists: [],
                };
              });
              storage.updateShoppingList.mockImplementation((args, fields) => ({
                id: args,
                name: fields.name,
                image: fields.image,
                description: fields.description,
                archived: fields.archived,
                invitees: fields.invitees,
                items: fields.items,
              }));
              storage.updateUser.mockImplementation((args, fields) => ({
                id: args,
                name: fields.name,
                shoppingLists: fields.shoppingLists,
              }));
            },
          },
        },
        exp: {
          result: {
            body: {
              data: {
                id: '1',
                name: 'name',
                image: 'image',
                role: 'owner',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
            },
          },
        },
      },
      {
        name: 'user not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new UserNotFoundError());
            },
          },
        },
        exp: {
          error: new UserNotFoundError(),
        },
      },
      {
        name: 'user shopping list not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new ShoppingListNotFoundError());
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'user unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'user does not have shopping list error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '2',
                    name: 'Shopping list #2',
                    archived: true,
                  },
                ],
              }));
            },
          },
        },
        exp: {
          error: new BadRequestError('User does not have this shopping list'),
        },
      },
      {
        name: 'update shopping list shopping list not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                    name: 'Shopping list #1',
                    archived: true,
                  },
                ],
              }));
              storage.updateShoppingList.mockRejectedValue(
                new ShoppingListNotFoundError(),
              );
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'update shopping list unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                    name: 'Shopping list #1',
                    archived: true,
                  },
                ],
              }));
              storage.updateShoppingList.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'invitee user not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [
                      {
                        id: '1',
                        name: 'Shopping list #1',
                        archived: true,
                      },
                    ],
                  };
                }

                throw new UserNotFoundError();
              });
              storage.updateShoppingList.mockImplementation((args, fields) => ({
                id: args,
                name: fields.name,
                image: fields.image,
                description: fields.description,
                archived: fields.archived,
                invitees: fields.invitees,
                items: fields.items,
              }));
            },
          },
        },
        exp: {
          error: new UserNotFoundError(),
        },
      },
      {
        name: 'invitee user shopping list not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [
                      {
                        id: '1',
                        name: 'Shopping list #1',
                        archived: true,
                      },
                    ],
                  };
                }

                throw new ShoppingListNotFoundError();
              });
              storage.updateShoppingList.mockImplementation((args, fields) => ({
                id: args,
                name: fields.name,
                image: fields.image,
                description: fields.description,
                archived: fields.archived,
                invitees: fields.invitees,
                items: fields.items,
              }));
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'invitee user unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [
                      {
                        id: '1',
                        name: 'Shopping list #1',
                        archived: true,
                      },
                    ],
                  };
                }

                throw new Error('unknown error');
              });
              storage.updateShoppingList.mockImplementation((args, fields) => ({
                id: args,
                name: fields.name,
                image: fields.image,
                description: fields.description,
                archived: fields.archived,
                invitees: fields.invitees,
                items: fields.items,
              }));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'invitee update user unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              body: {
                name: 'name',
                image: 'image',
                description: 'description',
                archived: false,
                invitees: [
                  {
                    id: '2',
                  },
                ],
                items: [],
              },
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => {
                if (args === '1') {
                  return {
                    id: args,
                    name: 'John',
                    shoppingLists: [
                      {
                        id: '1',
                        name: 'Shopping list #1',
                        archived: true,
                      },
                    ],
                  };
                }

                throw new Error('unknown error');
              });
              storage.updateShoppingList.mockImplementation((args, fields) => ({
                id: args,
                name: fields.name,
                image: fields.image,
                description: fields.description,
                archived: fields.archived,
                invitees: fields.invitees,
                items: fields.items,
              }));
              storage.updateUser.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.storage();

      try {
        await controller.updateShoppingList(args.ctx);
        expect(args.ctx.body).toStrictEqual(exp.result.body);
      } catch (error) {
        expect(error).toEqual(exp.error);
      }
    });
  });

  describe('remove shopping list', () => {
    test.each([
      {
        name: 'ok',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                  },
                ],
              }));
              storage.shoppingList.mockImplementation((args) => ({
                id: args,
                name: 'Shopping list #1',
                archived: true,
                invitees: [
                  {
                    id: '2',
                  },
                ],
              }));
              storage.removeShoppingList.mockResolvedValue();
            },
          },
        },
        exp: {
          result: {
            body: '',
          },
          status: 204,
        },
      },
      {
        name: 'user not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new UserNotFoundError());
            },
          },
        },
        exp: {
          error: new UserNotFoundError(),
        },
      },
      {
        name: 'user shopping list not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new ShoppingListNotFoundError());
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'user unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'user does not have shopping list error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [],
              }));
            },
          },
        },
        exp: {
          error: new BadRequestError('User does not have this shopping list'),
        },
      },
      {
        name: 'user not owner of the shopping list error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                  },
                ],
              }));
              storage.shoppingList.mockImplementation((args) => ({
                id: args,
                name: 'Shopping list #1',
                archived: true,
                invitees: [
                  {
                    id: '1',
                  },
                ],
              }));
            },
          },
        },
        exp: {
          error: new BadRequestError('User is not owner of this shopping list'),
        },
      },
      {
        name: 'remove shopping list unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                  },
                ],
              }));
              storage.shoppingList.mockImplementation((args) => ({
                id: args,
                name: 'Shopping list #1',
                archived: true,
                invitees: [
                  {
                    id: '2',
                  },
                ],
              }));
              storage.removeShoppingList.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.storage();

      try {
        await controller.removeShoppingList(args.ctx);
        expect(args.ctx.body).toStrictEqual(exp.result.body);
        expect(args.ctx.status).toStrictEqual(exp.status);
      } catch (error) {
        expect(error).toEqual(exp.error);
      }
    });
  });

  describe('leave shopping list', () => {
    test.each([
      {
        name: 'ok',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                  },
                ],
              }));
              storage.shoppingList.mockImplementation((args) => ({
                id: args,
                name: 'Shopping list #1',
                archived: true,
                invitees: [
                  {
                    id: '1',
                  },
                ],
              }));
              storage.updateUser.mockResolvedValue();
            },
          },
        },
        exp: {
          result: {
            body: '',
          },
          status: 204,
        },
      },
      {
        name: 'user not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new UserNotFoundError());
            },
          },
        },
        exp: {
          error: new UserNotFoundError(),
        },
      },
      {
        name: 'user shopping list not found error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new ShoppingListNotFoundError());
            },
          },
        },
        exp: {
          error: new ShoppingListNotFoundError(),
        },
      },
      {
        name: 'user unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
      {
        name: 'user does not have shopping list error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [],
              }));
            },
          },
        },
        exp: {
          error: new BadRequestError('User does not have this shopping list'),
        },
      },
      {
        name: 'user owner of the shopping list error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                  },
                ],
              }));
              storage.shoppingList.mockImplementation((args) => ({
                id: args,
                name: 'Shopping list #1',
                archived: true,
                invitees: [],
              }));
            },
          },
        },
        exp: {
          error: new BadRequestError('User is owner of this shopping list'),
        },
      },
      {
        name: 'update user unknown error',
        args: {
          ctx: {
            params: {
              id: '1',
            },
            request: {
              header: {
                caller: '1',
              },
            },
            body: null,
          },
          mock: {
            storage: () => {
              storage.user.mockImplementation((args) => ({
                id: args,
                name: 'John',
                shoppingLists: [
                  {
                    id: '1',
                  },
                ],
              }));
              storage.shoppingList.mockImplementation((args) => ({
                id: args,
                name: 'Shopping list #1',
                archived: true,
                invitees: [
                  {
                    id: '1',
                  },
                ],
              }));
              storage.updateUser.mockRejectedValue(new Error('unknown error'));
            },
          },
        },
        exp: {
          error: new Error('unknown error'),
        },
      },
    ])('$name', async ({ args, exp }) => {
      args.mock.storage();

      try {
        await controller.leaveShoppingList(args.ctx);
        expect(args.ctx.body).toStrictEqual(exp.result.body);
        expect(args.ctx.status).toStrictEqual(exp.status);
      } catch (error) {
        expect(error).toEqual(exp.error);
      }
    });
  });
});
