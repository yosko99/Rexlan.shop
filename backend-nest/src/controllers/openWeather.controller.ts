import { Controller, Get, Query } from '@nestjs/common';

import { CurrentLang } from '../decorators/currentLang.decorator';

import { OpenWeatherService } from '../services/openWeather.service';

@Controller('openweather')
export class OpenWeatherController {
  constructor(private readonly openWeatherService: OpenWeatherService) {}

  @Get('/city')
  getCurrentCity(
    @Query('lon') lon: string,
    @Query('lat') lat: string,
    @CurrentLang() currentLang: string,
  ) {
    return this.openWeatherService.getCurrentCity(lon, lat, currentLang);
  }
}
