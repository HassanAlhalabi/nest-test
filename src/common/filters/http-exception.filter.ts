import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Nest HTTP Exception
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      if (response instanceof Object) {
        // @ts-expect-error type error
        message = response.message;
        if(Array.isArray(message)){
          message = message[0]
        }
      } else {
        message = response
      }
    } else if (exception instanceof TypeORMError) {
      message = exception.message
      
    } else if (exception instanceof Error) {
      // Generic error handling
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      targetUrl: request.url,
      error: { message, code: status },
      result: null,
    });
  }
}
