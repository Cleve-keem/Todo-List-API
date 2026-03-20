export class TodoTitleExistError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = "TodoTitleError";
    this.code = 409;
  }
}

export class TodoNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoNotFound";
  }
}
