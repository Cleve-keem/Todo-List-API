export class AuthError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 401,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export class InvalidPasswordError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 401,
  ) {
    super(message);
    this.name = "PsswordError";
  }
}
