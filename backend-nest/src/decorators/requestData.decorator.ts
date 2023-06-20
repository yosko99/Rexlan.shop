import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { DataInRequestType } from '../types/request.types';

export const RequestData = createParamDecorator(
  (data: DataInRequestType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[data];
  },
);
