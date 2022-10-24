import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ProductType } from '../types/product.types';

export const Product = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ProductType => {
    const request = ctx.switchToHttp().getRequest();
    return request.product;
  },
);
