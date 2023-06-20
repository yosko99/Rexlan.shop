import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { TestService } from './test.service';

import { orderSchema } from '../../modules/orders/schemas/order.schema';
import { userSchema } from '../../modules/users/schemas/user.schema';
import { cartShema } from '../../modules/carts/schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cart', schema: cartShema },
      { name: 'User', schema: userSchema },
      { name: 'Order', schema: orderSchema },
    ]),
  ],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
