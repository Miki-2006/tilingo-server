import { HttpException, HttpStatus } from '@nestjs/common';
export class DatabaseUsersError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UserNotFoundError extends HttpException {
  constructor(nickName: string) {
    super(
      `Could not find user with nickName: ${nickName}`,
      HttpStatus.NOT_FOUND,
    );
    this.name = this.constructor.name;
  }
}

export class PasswordNotCorrectError extends HttpException {
  constructor(nickName: string) {
    super(
      `Password is not correct for user with nickName: ${nickName}`,
      HttpStatus.UNAUTHORIZED,
    );
    this.name = this.constructor.name;
  }
}

export class UserAlreadyExistsError extends HttpException {
  constructor(nickName: string) {
    super(`User with nickName ${nickName} already exists`, HttpStatus.CONFLICT);
    this.name = this.constructor.name;
  }
}
