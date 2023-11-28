export default class BaseError extends Error {
  name;

  statusCode;

  isOperational;

  constructor(
    name,
    statusCode,
    description,
    isOperational,
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
