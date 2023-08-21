import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { OpenWeatherController } from './openWeather.controller';

import { OpenWeatherService } from './openWeather.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [OpenWeatherController],
  providers: [OpenWeatherService, PrismaService],
  exports: [OpenWeatherService],
})
export class OpenWeatherModule {}
