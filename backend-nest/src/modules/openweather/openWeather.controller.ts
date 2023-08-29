import { Controller, Get, Query } from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { OpenWeatherService } from './openWeather.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { currentLangQuery } from '../../swagger/apiQueryOptions';

@Controller('openweather')
@ApiTags('Openweather')
export class OpenWeatherController {
  constructor(private readonly openWeatherService: OpenWeatherService) {}

  @Get('/city')
  @ApiOperation({ summary: 'Get current city' })
  @ApiQuery(currentLangQuery)
  @ApiQuery({ name: 'lon', type: 'number' })
  @ApiQuery({ name: 'lat', type: 'number' })
  @ApiResponse({ status: 200, description: 'City name fetched' })
  @ApiResponse({ status: 400, description: 'Invalid coordinates' })
  getCurrentCity(
    @Query('lon') lon: string,
    @Query('lat') lat: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.openWeatherService.getCurrentCity(lon, lat, currentLang);
  }
}
