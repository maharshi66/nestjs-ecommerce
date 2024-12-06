import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StandardResponse } from '../dto/standard-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, StandardResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && 'status' in data && 'message' in data && 'data' in data) {
          return data; // Return as-is
        }

        return {
          status: 'success',
          message: 'Request was successful',
          data,
        };
      }),
    );
  }
}
