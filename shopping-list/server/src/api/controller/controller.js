class Controller {
  storage;

  constructor(storage) {
    this.storage = storage;
  }

  async users(ctx) {
    const users = await this.storage.users();

    ctx.body = { data: users };
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
}

export default Controller;
