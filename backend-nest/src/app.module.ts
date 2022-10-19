import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';

import dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
