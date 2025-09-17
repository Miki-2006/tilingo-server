export class DatabaseUsersError extends Error {
    constructor(message: string, public readonly statusCode: number) {
        super(message);
        this.name = 'DatabaseUsersError';
    }
}

export class UserNotFoundError extends DatabaseUsersError {
    constructor(nickName: string) {
        super(`Could not find user with nickName: ${nickName}`, 404);
        this.name = 'UserNotFoundError';
    }
}

export class PasswordNotCorrectError extends DatabaseUsersError {
    constructor(nickName: string) {
        super(`Password is not correct for user with nickName: ${nickName}`, 401),
        this.name = 'PasswordNotCorrectError';
    }
}

export class UserAlreadyExistsError extends DatabaseUsersError {
    constructor(nickName: string) {
        super(`User with nickName ${nickName} already exists`, 409),
        this.name = 'UserAlreadyExistsError'
    }
}