import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ModulesApiErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof AxiosError) {
                    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
                    const message = error.response?.statusText || 'Supabase API Error!';

                    switch(status) {
                        case 406:
                            return throwError(() => new HttpException('Cannot find user', HttpStatus.NOT_FOUND));
                        case 404:
                            if (Array.isArray(error.response?.data) && typeof error.response?.data[0] === 'string') {
                                return throwError(() => new HttpException(`Could not find modules`, HttpStatus.NOT_FOUND));
                            }       
                            return throwError(() => new HttpException(message, status));
                        default:
                            return throwError(() => new HttpException(message, status));
                    }
                }

                return throwError(() => error)
            })
        )
    }
}