import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type MiddlewareData = 'currentLang' | 'userDataFromToken';

export const RequestData = createParamDecorator(
  (data: MiddlewareData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[data];
  },
);
