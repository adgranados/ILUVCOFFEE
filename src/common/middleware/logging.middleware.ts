import { Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';


@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    console.time("Resquest-response time");
    console.table(
      {
        title:"Hi From Middleware",
        headers:JSON.stringify(req.headers),
        method:req.method,
        url:req.url,
      }
    )
    res.on('finish', () => console.timeEnd('Resquest-response time'));
    next();
  }
}
