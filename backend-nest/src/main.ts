import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv = require('dotenv');
import { join } from 'path';

import { HttpErrorFilter } from './filters/httpError.filter';

import setLanguageMiddleware from './middleware/utils/setLanguage.middleware';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });
  app.useGlobalFilters(new HttpErrorFilter());
  app.setGlobalPrefix('api');
  app.enableCors();

  app.use(setLanguageMiddleware);

  await app.listen(process.env.PORT);
}

bootstrap();
