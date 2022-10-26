import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { OrderType } from '../types/order.types';

export const OrderInfo = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): OrderType => {
    const request = ctx.switchToHttp().getRequest();
    return request.orderInfo;
  },
);
