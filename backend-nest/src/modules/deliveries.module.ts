import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { deliverySchema } from '../schemas/delivery.schema';

import { DeliveriesController } from '../controllers/deliveries.controllers';

import { DeliveriesService } from '../services/deliveries.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Delivery', schema: deliverySchema }]),
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}
