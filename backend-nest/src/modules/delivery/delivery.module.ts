import { Module } from '@nestjs/common';

import { DeliveryController } from './delivery.controllers';

import { DeliveryService } from './delivery.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService, PrismaService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
