import { StatusCode } from "../enums";

export class BaseError extends Error {
  public statusCode: StatusCode;

  constructor(
    message: string,
    statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR,
  ) {
    super(message);

    this.statusCode = statusCode;
  }
}

//

export class BadRequestError extends BaseError {
  public statusCode = StatusCode.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}

export class ConflictError extends BaseError {
  public statusCode = StatusCode.CONFLICT;

  constructor(message: string) {
    super(message);
  }
}

export class InternalServerError extends BaseError {
  public statusCode = StatusCode.INTERNAL_SERVER_ERROR;

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends BaseError {
  public statusCode = StatusCode.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedError extends BaseError {
  public statusCode = StatusCode.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}
