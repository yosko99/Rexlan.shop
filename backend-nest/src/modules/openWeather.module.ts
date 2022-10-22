import { Module } from '@nestjs/common';

import { OpenWeatherController } from 'src/controllers/openWeather.controller';

import { OpenWeatherService } from 'src/services/openWeather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OpenWeatherController],
  providers: [OpenWeatherService],
})
export class OpenWeatherModule {}
