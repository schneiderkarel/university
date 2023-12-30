import { defineShoppingListRole } from './utils.js';

class Controller {
  storage;

  constructor(storage) {
    this.storage = storage;
  }

  async users(ctx) {
    const users = await this.storage.users();

    ctx.body = { data: users };
  }

  async user(ctx) {
    const { id } = ctx.params;

    const user = await this.storage.user(id);

    ctx.body = { data: user };
  }

  async createUser(ctx) {
    const { request } = ctx;

    const user = {
      name: request.body.name,
      shoppingLists: [],
    };

    const createdUser = await this.storage.createUser(user);

    ctx.body = { data: createdUser };
  }

  async createShoppingList(ctx) {
    const { request } = ctx;

    const shoppingList = {
      name: request.body.name,
      image: request.body.image,
      description: request.body.description,
      archived: request.body.archived,
      invitees: request.body.invitees,
      items: request.body.items,
    };

    const { caller } = request.header;

    const user = await this.storage.user(caller);

    const createdShoppingList = await this.storage.createShoppingList(shoppingList);

    for (let i = 0; i < shoppingList.invitees.length; i += 1) {
      const invitee = shoppingList.invitees[i];

      const inviteeUser = await this.storage.user(invitee.id);

      inviteeUser.shoppingLists.push({ id: createdShoppingList.id });

      await this.storage.updateUser(inviteeUser.id, inviteeUser);
    }

    user.shoppingLists.push({ id: createdShoppingList.id });

    await this.storage.updateUser(user.id, user);

    ctx.body = {
      data: {
        ...createdShoppingList,
        role: defineShoppingListRole(user.id, createdShoppingList.invitees),
      },
    };
  }
}

export default Controller;
