import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv = require('dotenv');

import { REDIS_CACHE_OPTIONS } from './constants/redis.constants';

import { ProductModule } from './modules/products.module';

dotenv.config();

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    CacheModule.register({
      ...REDIS_CACHE_OPTIONS,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
