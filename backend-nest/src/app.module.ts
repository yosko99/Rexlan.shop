import { Module, CacheModule as NestCache } from '@nestjs/common';
import dotenv = require('dotenv');

import { OpenWeatherModule } from './modules/openweather/openWeather.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/cart/cart.module';
import { UserModule } from './modules/user/user.module';
import { CacheService } from './modules/cache/cache.service';
import { CacheModule } from './modules/cache/cache.module';
import { GlobalExceptionFilter } from './filters/globalException.filter';
import { MailModule } from './modules/mail/mail.module';
import { PrismaService } from './prisma/prisma.service';

dotenv.config();

@Module({
  imports: [
    MailModule,
    UserModule,
    CacheModule,
    CartModule,
    OrderModule,
    ProductModule,
    CategoryModule,
    DeliveryModule,
    OpenWeatherModule,
    NestCache.register({
      isGlobal: true,
    }),
  ],
  providers: [CacheService, GlobalExceptionFilter, PrismaService],
})
export class AppModule {}
