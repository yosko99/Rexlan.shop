import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv = require('dotenv');

import { REDIS_CACHE_OPTIONS } from './constants/redis.constants';

import { OpenWeatherModule } from './modules/openWeather.module';
import { CategoriesModule } from './modules/categories.module';
import { DeliveriesModule } from './modules/deliveries.module';
import { ProductsModule } from './modules/products.module';
import { CartsModule } from './modules/carts.module';

dotenv.config();

@Module({
  imports: [
    CartsModule,
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
