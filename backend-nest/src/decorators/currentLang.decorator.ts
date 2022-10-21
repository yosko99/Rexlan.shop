import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentLang = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentLang;
  },
);
