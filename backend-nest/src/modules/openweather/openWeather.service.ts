import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import lang from '../../resources/lang';
import { AxiosResponse } from 'axios';

interface OpenweatherResponse {
  name: string;
}

@Injectable()
export class OpenWeatherService {
  constructor(private readonly http: HttpService) {}

  async getCurrentCity(lon: string, lat: string, currentLang: string) {
    const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

    if (OPENWEATHER_API_KEY === undefined) {
      throw new NotFoundException(lang[currentLang].global.apiKeyNotProvided);
    }

    if (lon === undefined || lat === undefined) {
      throw new NotFoundException(
        lang[currentLang].controllers.openWeather.coordinatesNotProvided,
      );
    }

    let response: AxiosResponse<OpenweatherResponse[], any>;

    try {
      response = await this.http
        .get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`,
        )
        .toPromise();
    } catch (error) {
      throw new HttpException(
        lang[currentLang].controllers.openWeather.invalidCoordinates,
        400,
      );
    }

    const [{ name: city }] = response.data;

    return { city };
  }
}
