import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { StandardResponse } from '../dto/standard-response.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse();
    const status = exception?.status || 500;
    const message = exception?.message || 'Internal server error';

    const responseBody: StandardResponse<any> = {
      status: 'error',
      message,
      error: message,
    };

    response.status(status).json(responseBody);
  }
}
