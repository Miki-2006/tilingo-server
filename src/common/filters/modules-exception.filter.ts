import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ModulesApiError } from "../errors/modules.errors";
import { Response } from "express";

@Catch(ModulesApiError)
export class ModulesApiExceptionFilter implements ExceptionFilter{
    catch(exception: ModulesApiError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(exception.statusCode).json({
            statusCode: exception.statusCode,
            message: exception.message,
            error: exception.name
        })
    }
}