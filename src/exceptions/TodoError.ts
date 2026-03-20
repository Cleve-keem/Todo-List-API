export class TodoTitleExistError extends Error {
  statusCode = 409;
  constructor(message: string) {
    super(message);
    this.name = "TodoTitleError";
  }
}

export class TodoNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoNotFound";
  }
}
