import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

import setLanguageMiddleware from './middleware/utils/setLanguage.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv = require('dotenv');

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/public' });
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });
  app.setGlobalPrefix('api');
  app.enableCors();

  app.use(setLanguageMiddleware);

  const config = new DocumentBuilder()
    .setTitle('Rexlan Shop API')
    .setDescription('Endpoints routes for Rexlan project')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
