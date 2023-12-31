import { useTranslation } from 'react-i18next';

class Client {
  address;

  t;

  constructor() {
    this.address = `${process.env.REACT_APP_BASE_URL || ''}`;
    const { t } = useTranslation();
    this.t = t;
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
      throw Error(this.t('Client.users.default'));
    }
  }

  async createUser(user) {
    const response = await fetch(`${this.address}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        CALLER: '',
      },
      body: JSON.stringify(user),
    });

    const body = await response.json();

    switch (response.status) {
    case 200:
      return body.data;
    case 422:
      throw Error(`${this.t('Client.users.422')}: ${body.error.detail}.`);
    default:
      throw Error(this.t('Client.createUser.default'));
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
      throw Error(this.t('Client.user.404'));
    default:
      throw Error(this.t('Client.user.default'));
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
      throw Error(this.t('Client.shoppingList.400'));
    case 404:
      throw Error(this.t('Client.shoppingList.404'));
    default:
      throw Error(this.t('Client.shoppingList.default'));
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
      throw Error(`${this.t('Client.createShoppingList.422')}: ${body.error.detail}.`);
    default:
      throw Error(this.t('Client.createShoppingList.default'));
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
      throw Error(this.t('Client.updateShoppingList.404'));
    case 422:
      throw Error(`${this.t('Client.updateShoppingList.422')}: ${body.error.detail}.`);
    default:
      throw Error(this.t('Client.updateShoppingList.default'));
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
        throw Error(this.t('Client.removeShoppingList.400'));
      default:
        throw Error(this.t('Client.removeShoppingList.default'));
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
        throw Error(this.t('Client.leaveShoppingList.400'));
      default:
        throw Error(this.t('Client.leaveShoppingList.default'));
      }
    }
  }
}

export default Client;
