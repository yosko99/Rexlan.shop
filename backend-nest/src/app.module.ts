import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv = require('dotenv');

import { REDIS_CACHE_OPTIONS } from './constants/redis.constants';

import { OpenWeatherModule } from './modules/openweather/openWeather.module';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CartsModule } from './modules/carts/carts.module';

dotenv.config();

@Module({
  imports: [
    CartsModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    DeliveriesModule,
    OpenWeatherModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    CacheModule.register({
      ...REDIS_CACHE_OPTIONS,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
