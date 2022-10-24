import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { CartType } from '../types/cart.types';

export const Cart = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CartType => {
    const request = ctx.switchToHttp().getRequest();
    return request.cart;
  },
);
