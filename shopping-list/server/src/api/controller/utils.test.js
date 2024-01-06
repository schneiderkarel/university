import { defineShoppingListRole, userHasShoppingList } from './utils.js';

describe('defineShoppingListRole', () => {
  test.each([
    {
      name: 'owner',
      args: {
        id: '0',
        invitees: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      },
      exp: {
        result: 'owner',
      },
    },
    {
      name: 'invitee',
      args: {
        id: '2',
        invitees: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      },
      exp: {
        result: 'invitee',
      },
    },
  ])('$name', ({ args, exp }) => {
    expect(defineShoppingListRole(args.id, args.invitees)).toStrictEqual(exp.result);
  });
});

describe('userHasShoppingList', () => {
  test.each([
    {
      name: 'has',
      args: {
        user: {
          shoppingLists: [
            {
              id: '1',
            },
            {
              id: '2',
            },
          ],
        },
        shoppingListId: '1',
      },
      exp: {
        result: true,
      },
    },
    {
      name: 'does not have',
      args: {
        user: {
          shoppingLists: [
            {
              id: '1',
            },
            {
              id: '2',
            },
          ],
        },
        shoppingListId: '0',
      },
      exp: {
        result: false,
      },
    },
  ])('$name', ({ args, exp }) => {
    expect(userHasShoppingList(args.user, args.shoppingListId)).toStrictEqual(exp.result);
  });
});
