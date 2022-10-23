import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { TestService } from './test.service';

import { cartShema } from '../../schemas/cart.schema';
import { userSchema } from '../../schemas/user.schema';
import { orderSchema } from '../../schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cart', schema: cartShema },
      { name: 'User', schema: userSchema },
      { name: 'Order', schema: orderSchema },
    ]),
  ],
  providers: [TestService],
})
export class TestModule {}
