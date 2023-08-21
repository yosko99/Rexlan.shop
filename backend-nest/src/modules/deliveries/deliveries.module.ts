import { Module } from '@nestjs/common';

import { DeliveriesController } from './deliveries.controllers';

import { DeliveriesService } from './deliveries.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveriesService, PrismaService],
})
export class DeliveriesModule {}
