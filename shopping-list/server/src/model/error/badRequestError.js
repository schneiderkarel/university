import BaseError from './baseError.js';
import { HTTP_BAD_REQUEST } from '../http/response.js';

export default class BadRequestError extends BaseError {
  constructor(description = 'Bad request') {
    super(
      'BAD_REQUEST',
      HTTP_BAD_REQUEST,
      description,
      true,
    );
  }
}
