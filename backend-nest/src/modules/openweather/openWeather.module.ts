import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { OpenWeatherController } from './openWeather.controller';

import { OpenWeatherService } from './openWeather.service';

@Module({
  imports: [HttpModule],
  controllers: [OpenWeatherController],
  providers: [OpenWeatherService],
  exports: [OpenWeatherService],
})
export class OpenWeatherModule {}
