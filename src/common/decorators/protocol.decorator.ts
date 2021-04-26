import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Protocol = createParamDecorator(
    (defaultProtocol: string, ctx: ExecutionContext) => {
        console.log(defaultProtocol)
        const request = ctx.switchToHttp().getRequest();
        return request.protocol;
    }
)