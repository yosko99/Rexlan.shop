import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpErrorFilter } from './filters/httpError.filter';

import setLanguageMiddleware from './middleware/utils/setLanguage.middleware';

import dotenv = require('dotenv');
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpErrorFilter());
  app.setGlobalPrefix('api');

  app.use(setLanguageMiddleware);

  await app.listen(process.env.PORT);
}

bootstrap();
