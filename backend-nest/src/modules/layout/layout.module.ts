import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeliveriesController } from './layout.controllers';

import { LayoutService } from './layout.service';
import { layoutSchema } from './schemas/layout.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Layout', schema: layoutSchema }]),
  ],
  controllers: [DeliveriesController],
  providers: [LayoutService],
  exports: [LayoutService],
})
export class LayoutModule {}
