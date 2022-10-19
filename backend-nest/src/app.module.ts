import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';

import { ProductModule } from './modules/products.module';

import dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [ProductModule, MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
