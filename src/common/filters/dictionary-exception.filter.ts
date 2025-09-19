import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { DictionaryApiError } from "../errors/dicitonary.errors";
import { Response } from "express";

@Catch(DictionaryApiError)
export class DictionaryApiExceptionFilter implements ExceptionFilter{
    catch(exception: DictionaryApiError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(exception.statusCode).json({
            statusCode: exception.statusCode,
            message: exception.message,
            error: exception.name
        })
    }
}