import { MongoClient } from 'mongodb';

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
}

export default Storage;
