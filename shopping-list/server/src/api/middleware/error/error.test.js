import { ValidationError } from 'joi';
import errorMiddleware from './error.js';
import BaseError from '../../../model/error/baseError.js';
import {
  HTTP_BAD_REQUEST,
  HTTP_METHOD_NOT_ALLOWED,
  HTTP_NOT_FOUND,
} from '../../../model/http/response.js';

describe('errorMiddleware', () => {
  test.each([
    {
      name: 'unknown error',
      args: {
        context: {},
        error: new Error('unknown error'),
      },
      exp: {
        body: {
          error: {
            status: 500,
            title: 'INTERNAL_SERVER_ERROR',
            detail: 'unknown error',
          },
        },
        status: 500,
      },
    },
    {
      name: 'joi validation error',
      args: {
        context: {},
        error: new ValidationError(
          'validation error',
          [{
            message: 'message',
            path: 'path',
            type: 'type',
          }],
          {},
        ),
      },
      exp: {
        body: {
          error: {
            status: 422,
            title: 'VALIDATION_ERROR',
            detail: 'message',
          },
        },
        status: 422,
      },
    },
    {
      name: 'base error - bad request',
      args: {
        context: {},
        error: new BaseError('BAD REQUEST', HTTP_BAD_REQUEST, 'bad request'),
      },
      exp: {
        body: {
          error: {
            status: 400,
            title: 'BAD REQUEST',
            detail: 'bad request',
          },
        },
        status: 400,
      },
    },
    {
      name: 'base error - not found',
      args: {
        context: {},
        error: new BaseError('NOT FOUND', HTTP_NOT_FOUND, 'not found'),
      },
      exp: {
        body: {
          error: {
            status: 404,
            title: 'NOT FOUND',
            detail: 'The requested resource could not be found',
          },
        },
        status: 404,
      },
    },
    {
      name: 'base error - method not allowed',
      args: {
        context: {},
        error: new BaseError('METHOD NOT ALLOWED', HTTP_METHOD_NOT_ALLOWED, 'method not allowed'),
      },
      exp: {
        body: {
          error: {
            status: 405,
            title: 'METHOD NOT ALLOWED',
            detail: 'The requested resource does not support requested method',
          },
        },
        status: 405,
      },
    },
    {
      name: 'base error - unknown',
      args: {
        context: {},
        error: new BaseError('UNKNOWN', 101, 'unknown error'),
      },
      exp: {
        body: {
          error: {
            status: 500,
            title: 'UNKNOWN',
            detail: 'unknown error',
          },
        },
        status: 500,
      },
    },
  ])('$name', async ({ args, exp }) => {
    await errorMiddleware(args.context, async () => {
      throw args.error;
    });

    expect(args.context.body).toStrictEqual(exp.body);
    expect(args.context.status).toStrictEqual(exp.status);
  });
});
