import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { DeliveryController } from './delivery.controllers';

import { DeliveryService } from './delivery.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { VerifyJWT } from '../../middleware/utils/verifyJWT.middleware';

@Module({
  imports: [UserModule],
  controllers: [DeliveryController],
  providers: [DeliveryService, PrismaService],
  exports: [DeliveryService],
})
export class DeliveryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes(
      {
        path: '/deliveries',
        method: RequestMethod.POST,
      },
      {
        path: '/deliveries/:id',
        method: RequestMethod.PUT,
      },
    );
  }
}
