import { defineShoppingListRole, userHasShoppingList } from './utils.js';
import BadRequestError from '../../model/error/badRequestError.js';

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

  async shoppingList(ctx) {
    const { params, request } = ctx;

    const shoppingListId = params.id;

    const { caller } = request.header;

    const user = await this.storage.user(caller);

    if (!userHasShoppingList(user, shoppingListId)) {
      throw BadRequestError('User does not have this shopping list');
    }

    const shoppingList = await this.storage.shoppingList(shoppingListId);

    ctx.body = {
      data: {
        ...shoppingList,
        role: defineShoppingListRole(user.id, shoppingList.invitees),
      },
    };
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

    const callerInInvitees = shoppingList.invitees.find((invitee) => invitee.id === caller);
    if (callerInInvitees) {
      throw new BadRequestError('Caller cannot be in invitees');
    }

    const user = await this.storage.user(caller);

    const createdShoppingList = await this.storage.createShoppingList(shoppingList);

    await this.updateInvitees(createdShoppingList);

    user.shoppingLists.push({ id: createdShoppingList.id });
    await this.storage.updateUser(user.id, user);

    ctx.body = {
      data: {
        ...createdShoppingList,
        role: defineShoppingListRole(user.id, createdShoppingList.invitees),
      },
    };
  }

  async updateShoppingList(ctx) {
    const { params, request } = ctx;

    const shoppingListId = params.id;

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

    if (!userHasShoppingList(user, shoppingListId)) {
      throw BadRequestError('User does not have this shopping list');
    }

    const updatedShoppingList = await this.storage.updateShoppingList(shoppingListId, shoppingList);

    await this.updateInvitees(updatedShoppingList);

    ctx.body = {
      data: {
        ...updatedShoppingList,
        role: defineShoppingListRole(user.id, updatedShoppingList.invitees),
      },
    };
  }

  async removeShoppingList(ctx) {
    const { params, request } = ctx;

    const shoppingListId = params.id;

    const { caller } = request.header;

    const user = await this.storage.user(caller);

    if (!userHasShoppingList(user, shoppingListId)) {
      throw BadRequestError('User does not have this shopping list');
    }

    const shoppingList = await this.storage.shoppingList(shoppingListId);

    if (defineShoppingListRole(user.id, shoppingList.invitees) !== 'owner') {
      throw BadRequestError('User is not owner of this shopping list');
    }

    await this.storage.removeShoppingList(shoppingListId);

    ctx.body = '';
    ctx.status = 204;
  }

  async leaveShoppingList(ctx) {
    const { params, request } = ctx;

    const shoppingListId = params.id;

    const { caller } = request.header;

    const user = await this.storage.user(caller);

    if (!userHasShoppingList(user, shoppingListId)) {
      throw BadRequestError('User does not have this shopping list');
    }

    const shoppingList = await this.storage.shoppingList(shoppingListId);

    if (defineShoppingListRole(user.id, shoppingList.invitees) === 'owner') {
      throw BadRequestError('User is owner of this shopping list');
    }

    user.shoppingLists = user.shoppingLists.filter(
      (sl) => sl.id !== shoppingListId,
    );

    await this.storage.updateUser(user.id, user);

    ctx.body = '';
    ctx.status = 204;
  }

  async updateInvitees(shoppingList) {
    for (let i = 0; i < shoppingList.invitees.length; i += 1) {
      const invitee = shoppingList.invitees[i];

      const inviteeUser = await this.storage.user(invitee.id);

      if (!userHasShoppingList(inviteeUser, shoppingList.id)) {
        inviteeUser.shoppingLists.push({ id: shoppingList.id });

        await this.storage.updateUser(inviteeUser.id, inviteeUser);
      }
    }
  }
}

export default Controller;
