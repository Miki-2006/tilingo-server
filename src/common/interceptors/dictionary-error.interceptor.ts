import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class DictionaryErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof AxiosError) {
                    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
                    const message = error.response?.statusText || 'External API Error!';

                    switch(status) {
                        case 401:
                            return throwError(() => new HttpException('Invalid Merriam-Webster API key', HttpStatus.UNAUTHORIZED));
                        case 429:
                            return throwError(() => new HttpException('Merriam-Webster API rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS));
                        case 404:
                            if (Array.isArray(error.response?.data) && typeof error.response?.data[0] === 'string') {
                                return throwError(() => new HttpException(`Could not find definition`, HttpStatus.NOT_FOUND));
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