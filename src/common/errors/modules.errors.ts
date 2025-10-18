export class ModulesApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ModulesNotFoundError extends ModulesApiError {
    constructor(userId: string) {
        super(`Cannot find modules for user with id: ${userId}`, 404);
        this.name = this.constructor.name;
    }
}

export class UserNotFoundError extends ModulesApiError {
    constructor(userId: string) {
        super(`Cannot find user with id: ${userId}`, 406);
        this.name = this.constructor.name;
    }
}
