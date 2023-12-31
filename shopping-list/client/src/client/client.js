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
    case 404:
      throw Error(body.error.title);
    default:
      throw Error(body.error.title);
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
      throw Error(body.error.title);
    default:
      throw Error(body.error.title);
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
    case 404:
      throw Error(body.error.title);
    default:
      throw Error(body.error.title);
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
    case 404:
      throw Error(body.error.title);
    default:
      throw Error(body.error.title);
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
      throw Error(body.error.title);
    default:
      throw Error(body.error.title);
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
      const body = await response.json();
      throw Error(body.error.title);
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
      const body = await response.json();
      throw Error(body.error.title);
    }
  }
}

export default Client;
