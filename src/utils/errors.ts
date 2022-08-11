class HttpErrorClass extends Error {
  private status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends HttpErrorClass {
  constructor(message: string) {
    super(message, 404);
  }
}

export class JwtTokenError extends HttpErrorClass {
  constructor(message: string) {
    super(message, 400);
  }
}