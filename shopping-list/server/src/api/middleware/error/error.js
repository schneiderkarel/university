import Router from 'koa-joi-router';
import BaseError from '../../../model/error/baseError.js';
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_METHOD_NOT_ALLOWED,
  HTTP_UNPROCESSABLE_ENTITY,
} from '../../../model/http/response.js';

export default async function errorMiddleware(context, next) {
  try {
    await next();
  } catch (error) {
    let statusCode;
    let title;
    let message;

    if (Router.Joi.isError(error)) {
      statusCode = HTTP_UNPROCESSABLE_ENTITY;
      title = 'VALIDATION_ERROR';
      message = error.details[0].message;
    } else if (error instanceof BaseError) {
      title = error.name;

      switch (error.statusCode) {
      case HTTP_BAD_REQUEST:
        statusCode = HTTP_BAD_REQUEST;
        message = error.message;
        break;
      case HTTP_NOT_FOUND:
        statusCode = HTTP_NOT_FOUND;
        message = 'The requested resource could not be found';
        break;
      case HTTP_METHOD_NOT_ALLOWED:
        statusCode = HTTP_METHOD_NOT_ALLOWED;
        message = 'The requested resource does not support requested method';
        break;
      default:
        statusCode = 500;
        title = 'INTERNAL_SERVER_ERROR';
        message = 'Internal server error';
      }
    }

    context.status = statusCode;
    context.body = {
      error: {
        status: statusCode,
        title,
        detail: message,
      },
    };
  }
}
