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

  async user(id) {
    const usersCollection = this.database.collection('users');

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new UserNotFoundError()
    }

    return {
      id: user._id.toHexString(),
      name: user.name,
      shoppingLists: user.shoppingLists,
    };
  }
}

export default Storage;
