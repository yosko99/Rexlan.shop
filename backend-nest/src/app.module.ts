import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv = require('dotenv');

import { REDIS_CACHE_OPTIONS } from './constants/redis.constants';

import { CategoriesModule } from './modules/categories.module';
import { DeliveriesModule } from './modules/deliveries.module';
import { OpenWeatherModule } from './modules/openWeather.module';
import { ProductsModule } from './modules/products.module';

dotenv.config();

@Module({
  imports: [
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
