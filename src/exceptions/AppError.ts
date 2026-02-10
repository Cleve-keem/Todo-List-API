export class AppError extends Error {
  code: Number;

  constructor(message: string) {
    super(message);
    this.name = "App Error";
    this.code = 500;
  }
}
