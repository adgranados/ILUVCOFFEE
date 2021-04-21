import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_DECORATOR_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector:Reflector,
    private readonly configService: ConfigService
    ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Observable<boolean>((subs) => {
      let granted_access = false;
      const isPublic = this.reflector.get(IS_PUBLIC_DECORATOR_KEY, context.getHandler());
      if(isPublic){
        granted_access = true;
      }else{
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.header("Autorization");
        granted_access = authHeader === this.configService.get("API_KEY");
      }
      subs.next(granted_access);
      subs.complete();
    });
  }
}
