import BaseError from './baseError.js';
import { HTTP_NOT_FOUND } from '../http/response.js';

export default class ShoppingListNotFoundError extends BaseError {
  constructor(description = 'User not found') {
    super(
      'SHOPPING_LIST_NOT_FOUND',
      HTTP_NOT_FOUND,
      description,
      true,
    );
  }
}
