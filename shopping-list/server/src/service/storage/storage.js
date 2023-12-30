import { MongoClient, ObjectId } from 'mongodb';
import UserNotFoundError from '../../model/error/userNotFoundError.js';

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

    if (!updateResult.matchedCount && !updateResult.modifiedCount) {
      throw new UserNotFoundError();
    }

    const updatedUser = await usersCollection.findOne({ _id: new ObjectId(id) });

    return {
      id: updatedUser._id.toHexString(),
      name: updatedUser.name,
      shoppingLists: updatedUser.shoppingLists.map((shoppingList) => ({ id: shoppingList })),
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
}

export default Storage;
