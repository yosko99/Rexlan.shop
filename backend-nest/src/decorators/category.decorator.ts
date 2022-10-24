import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { CategoryType } from '../types/category.types';

export const Category = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CategoryType => {
    const request = ctx.switchToHttp().getRequest();
    return request.category;
  },
);
