export class UserAlreadyExitError extends Error {
  private code: number;

  constructor(message: string) {
    super(message);
    this.code = 400;
    this.name = "User Already Exist Error";
  }
}
