export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Auth token required.') {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Wrong auth token.') {
    super(message, 403);
  }
}
