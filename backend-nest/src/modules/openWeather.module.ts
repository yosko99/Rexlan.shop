import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { OpenWeatherController } from '../controllers/openWeather.controller';

import { OpenWeatherService } from '../services/openWeather.service';

@Module({
  imports: [HttpModule],
  controllers: [OpenWeatherController],
  providers: [OpenWeatherService],
})
export class OpenWeatherModule {}
