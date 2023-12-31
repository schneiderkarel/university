class Client {
  address;

  constructor() {
    this.address = `${process.env.REACT_APP_BASE_URL || ''}`;
  }

  async users(caller) {
    const response = await fetch(`${this.address}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        CALLER: caller,
      },
    });

    const body = await response.json();

    switch (response.status) {
    case 200:
      return body.data;
    default:
      throw Error('There was an unexpected error when loading users. Please, try again.');
    }
  }

  async user(id) {
    const response = await fetch(`${this.address}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        CALLER: id,
      },
    });

    const body = await response.json();

    switch (response.status) {
    case 200:
      return body.data;
    case 404:
      throw Error('User unexpectedly not found.');
    default:
      throw Error('There was an unexpected error when loading the user. Please, try again.');
    }
  }

  async shoppingList(caller, id) {
    const response = await fetch(`${this.address}/shopping-lists/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        CALLER: caller,
      },
    });

    const body = await response.json();

    switch (response.status) {
    case 200:
      return body.data;
    case 400:
      throw Error('You are not permitted to view the shopping list.');
    case 404:
      throw Error('Shopping list unexpectedly not found.');
    default:
      throw Error('There was an unexpected error when loading the shopping list. Please, try again.');
    }
  }

  async createShoppingList(caller, shoppingList) {
    const response = await fetch(`${this.address}/shopping-lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        CALLER: caller,
      },
      body: JSON.stringify(shoppingList),
    });

    const body = await response.json();

    switch (response.status) {
    case 200:
      return body.data;
    case 422:
      throw Error(`There is a problem with your input: ${body.error.detail}.`);
    default:
      throw Error('There was an unexpected error when creating the shopping list. Please, try again.');
    }
  }

  async updateShoppingList(caller, id, shoppingList) {
    const response = await fetch(`${this.address}/shopping-lists/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        CALLER: caller,
      },
      body: JSON.stringify(shoppingList),
    });

    const body = await response.json();

    switch (response.status) {
    case 200:
      return body.data;
    case 404:
      throw Error('Shopping list unexpectedly not found.');
    case 422:
      throw Error(`There is a problem with your input: ${body.error.detail}.`);
    default:
      throw Error('There was an unexpected error when updating the shopping list. Please, try again.');
    }
  }

  async removeShoppingList(caller, id) {
    const response = await fetch(`${this.address}/shopping-lists/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        CALLER: caller,
      },
    });

    if (response.status !== 204) {
      switch (response.status) {
      case 400:
        throw Error('You are not permitted to remove the shopping list.');
      default:
        throw Error('There was an unexpected error when removing the shopping list. Please, try again.');
      }
    }
  }

  async leaveShoppingList(caller, id) {
    const response = await fetch(`${this.address}/shopping-lists/${id}/leave`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        CALLER: caller,
      },
    });

    if (response.status !== 204) {
      switch (response.status) {
      case 400:
        throw Error('You are not permitted to leave the shopping list.');
      default:
        throw Error('There was an unexpected error when removing the shopping list. Please, try again.');
      }
    }
  }
}

export default Client;
