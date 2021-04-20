import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {Response, Request} from 'express';
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error = typeof response === 'string'
      ? { message: exceptionResponse } : (exceptionResponse as object);
    console.group("Request Data")
    console.log(request.headers)
    console.log(request.method)
    console.table(request.body)
    console.log(request.query)
    console.log(request.params)
    console.log(request.path)
    console.groupEnd()
    response.status(status).json({
      ...error,
      insomnia: request.headers['user-agent'].includes("insomnia"),
      timestamp: new Date().toISOString(),
    })
  }
}
