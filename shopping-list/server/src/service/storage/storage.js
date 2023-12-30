import { MongoClient, ObjectId } from 'mongodb';
import UserNotFoundError from '../../model/error/userNotFoundError.js';
import { noChangesAfterUpdate } from './utils.js';

class Storage {
  database;

  constructor(dsn) {
    const client = new MongoClient(dsn);
    this.database = client.db('shopperio');
  }

  async users() {
    const usersCollection = this.database.collection('users');
    const users = await usersCollection.find()
      .toArray();

    return users.map((user) => ({
      id: user._id.toHexString(),
      name: user.name,
    }));
  }

  async user(id) {
    const usersCollection = this.database.collection('users');

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      id: user._id.toHexString(),
      name: user.name,
      shoppingLists: user.shoppingLists.map((shoppingList) => ({
        id: shoppingList.toHexString(),
      })),
    };
  }

  async createUser(user) {
    const usersCollection = this.database.collection('users');

    const { insertedId: id } = await usersCollection.insertOne(user);

    const createdUser = await usersCollection.findOne({ _id: id });

    return {
      id: createdUser._id.toHexString(),
      name: createdUser.name,
      shoppingLists: createdUser.shoppingLists,
    };
  }

  async updateUser(id, user) {
    const usersCollection = this.database.collection('users');

    const updateUser = {
      _id: new ObjectId(user.id),
      name: user.name,
      shoppingLists: user.shoppingLists.map((shoppingList) => new ObjectId(shoppingList.id)),
    };

    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateUser },
    );

    if (noChangesAfterUpdate(updateResult)) {
      throw new UserNotFoundError();
    }

    const updatedUser = await usersCollection.findOne({ _id: new ObjectId(id) });

    return {
      id: updatedUser._id.toHexString(),
      name: updatedUser.name,
      shoppingLists: updatedUser.shoppingLists.map(
        (shoppingList) => ({ id: shoppingList.toHexString() }),
      ),
    };
  }

  async shoppingList(id) {
    const shoppingListsCollection = this.database.collection('shopping_lists');

    const shoppingList = await shoppingListsCollection.findOne({ _id: new ObjectId(id) });

    const usersCollection = this.database.collection('users');

    const invitees = [];

    for (let i = 0; i < shoppingList.invitees.length; i += 1) {
      const invitee = shoppingList.invitees[i];

      const user = await usersCollection.findOne({ _id: invitee });

      if (!user) {
        throw new UserNotFoundError();
      }

      invitees.push({ id: user._id.toHexString(), name: user.name });
    }

    return {
      id: shoppingList._id.toHexString(),
      name: shoppingList.name,
      image: shoppingList.image,
      description: shoppingList.description,
      archived: shoppingList.archived,
      invitees: invitees.map((invitee) => ({
        id: invitee.id,
        name: invitee.name,
      })),
      items: shoppingList.items.map((item) => ({
        id: item._id.toHexString(),
        name: item.name,
        quantity: item.quantity,
        resolved: item.resolved,
      })),
    };
  }

  async createShoppingList(shoppingList) {
    const shoppingListsCollection = this.database.collection('shopping_lists');

    const creteShoppingList = {
      ...shoppingList,
      invitees: shoppingList.invitees.map((invitee) => (new ObjectId(invitee.id))),
      items: shoppingList.items.map((item) => ({
        _id: new ObjectId(),
        name: item.name,
        quantity: item.quantity,
        resolved: item.resolved,
      })),
    };

    const { insertedId: id } = await shoppingListsCollection.insertOne(creteShoppingList);

    const createdShoppingList = await shoppingListsCollection.findOne({ _id: id });

    const usersCollection = this.database.collection('users');

    const invitees = [];

    for (let i = 0; i < createdShoppingList.invitees.length; i += 1) {
      const invitee = createdShoppingList.invitees[i];

      const user = await usersCollection.findOne({ _id: invitee });

      if (!user) {
        throw new UserNotFoundError();
      }

      invitees.push({ id: user._id.toHexString(), name: user.name });
    }

    return {
      id: createdShoppingList._id.toHexString(),
      name: createdShoppingList.name,
      image: createdShoppingList.image,
      description: createdShoppingList.description,
      archived: createdShoppingList.archived,
      invitees: invitees.map((invitee) => ({
        id: invitee.id,
        name: invitee.name,
      })),
      items: createdShoppingList.items.map((item) => ({
        id: item._id.toHexString(),
        name: item.name,
        quantity: item.quantity,
        resolved: item.resolved,
      })),
    };
  }

  async updateShoppingList(id, shoppingList) {
    const shoppingListsCollection = this.database.collection('shopping_lists');

    const updateShoppingList = {
      ...shoppingList,
      _id: new ObjectId(id),
      invitees: shoppingList.invitees.map((invitee) => (new ObjectId(invitee.id))),
      items: shoppingList.items.map((item) => ({
        _id: new ObjectId(),
        name: item.name,
        quantity: item.quantity,
        resolved: item.resolved,
      })),
    };

    const beforeUpdateShoppingList = await shoppingListsCollection.findOne(
      { _id: new ObjectId(id) },
    );

    const updateResult = await shoppingListsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateShoppingList },
    );

    if (noChangesAfterUpdate(updateResult)) {
      throw new UserNotFoundError();
    }

    const updatedShoppingList = await shoppingListsCollection.findOne({ _id: new ObjectId(id) });

    const usersCollection = this.database.collection('users');

    const invitees = [];

    await this.handleRemovedInvitees(beforeUpdateShoppingList, updatedShoppingList);

    for (let i = 0; i < updatedShoppingList.invitees.length; i += 1) {
      const invitee = updatedShoppingList.invitees[i];

      const inviteeUser = await usersCollection.findOne({ _id: invitee });

      if (!inviteeUser) {
        throw new UserNotFoundError();
      }

      invitees.push({ id: inviteeUser._id.toHexString(), name: inviteeUser.name });
    }

    return {
      id: updatedShoppingList._id.toHexString(),
      name: updatedShoppingList.name,
      image: updatedShoppingList.image,
      description: updatedShoppingList.description,
      archived: updatedShoppingList.archived,
      invitees: invitees.map((invitee) => ({
        id: invitee.id,
        name: invitee.name,
      })),
      items: updatedShoppingList.items.map((item) => ({
        id: item._id.toHexString(),
        name: item.name,
        quantity: item.quantity,
        resolved: item.resolved,
      })),
    };
  }

  async removeShoppingList(id) {
    const usersCollection = this.database.collection('users');

    await usersCollection.updateMany(
      { shoppingLists: new ObjectId(id) },
      { $pull: { shoppingLists: new ObjectId(id) } },
    );

    const shoppingListsCollection = this.database.collection('shopping_lists');

    await shoppingListsCollection.deleteOne({ _id: new ObjectId(id) });
  }

  async handleRemovedInvitees(beforeUpdateShoppingList, updatedShoppingList) {
    const usersCollection = this.database.collection('users');

    const removedInvitees = beforeUpdateShoppingList.invitees.filter(
      (invitee) => !updatedShoppingList.invitees.find(
        (i) => i.toHexString() === invitee.toHexString(),
      ),
    );

    for (let i = 0; i < removedInvitees.length; i += 1) {
      const removedInvitee = removedInvitees[i];

      const removedInviteeUser = await usersCollection.findOne({ _id: removedInvitee });

      if (!removedInviteeUser) {
        throw new UserNotFoundError();
      }

      const shoppingListsMissingRemoved = removedInviteeUser.shoppingLists.filter(
        (shoppingList) => shoppingList.toHexString() !== updatedShoppingList._id.toHexString(),
      );

      await usersCollection.updateOne(
        { _id: new ObjectId(removedInvitee) },
        {
          $set: {
            ...removedInviteeUser,
            shoppingLists: shoppingListsMissingRemoved.map((shoppingList) => shoppingList.id),
          },
        },
      );
    }
  }
}

export default Storage;
