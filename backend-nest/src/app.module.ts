import { Module, CacheModule as NestCache } from '@nestjs/common';
import dotenv = require('dotenv');

import { OpenWeatherModule } from './modules/openweather/openWeather.module';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CartsModule } from './modules/carts/carts.module';
import { UsersModule } from './modules/users/users.module';
import { CacheService } from './modules/cache/cache.service';
import { CacheModule } from './modules/cache/cache.module';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    CartsModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    DeliveriesModule,
    OpenWeatherModule,
    CacheModule,
    NestCache.register({
      isGlobal: true,
    }),
  ],
  providers: [CacheService],
})
export class AppModule {}
