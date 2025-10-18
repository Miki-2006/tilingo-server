import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { DatabaseUsersError, PasswordNotCorrectError, UserAlreadyExistsError, UserNotFoundError } from "../errors/users.errors";

@Catch(DatabaseUsersError)
export class DatabaseUsersExceptionFilter implements ExceptionFilter {
    catch(exception: DatabaseUsersError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof UserNotFoundError) {
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
        } else if (exception instanceof PasswordNotCorrectError) {
            status = HttpStatus.UNAUTHORIZED;
            message = exception.message;
        } else if (exception instanceof UserAlreadyExistsError) {
            status = HttpStatus.CONFLICT;
            message = exception.message;
        } else {
            status = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.message;
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
            error: exception.name,
            message
        });
    }
}