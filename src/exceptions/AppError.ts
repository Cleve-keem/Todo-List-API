export class AppError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.name = "AppError";
    this.code = 500;
  }
}
