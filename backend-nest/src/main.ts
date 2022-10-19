import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpErrorFilter } from './filters/httpError.filter';

import dotenv = require('dotenv');
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpErrorFilter());
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}

bootstrap();
