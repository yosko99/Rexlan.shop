import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { cartShema } from '../schemas/cart.schema';

import { CartsControler } from '../controllers/carts.controller';

import { CartsService } from '../services/carts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cart', schema: cartShema }])],
  controllers: [CartsControler],
  providers: [CartsService],
})
export class CartsModule {}
