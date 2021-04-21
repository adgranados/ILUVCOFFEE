import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Observable<boolean>((subs) => {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.header("Autorization");
      const granted_access = authHeader === process.env.API_KEY;
      subs.next(granted_access);
      subs.complete();
    });
  }
}
