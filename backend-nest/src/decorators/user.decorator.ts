import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserType } from '../types/user.types';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserType => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
