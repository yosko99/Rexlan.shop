import { Controller, Get, Query } from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { OpenWeatherService } from './openWeather.service';

@Controller('openweather')
export class OpenWeatherController {
  constructor(private readonly openWeatherService: OpenWeatherService) {}

  @Get('/city')
  getCurrentCity(
    @Query('lon') lon: string,
    @Query('lat') lat: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.openWeatherService.getCurrentCity(lon, lat, currentLang);
  }
}
