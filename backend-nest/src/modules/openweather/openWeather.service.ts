import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import lang from '../../resources/lang';

@Injectable()
export class OpenWeatherService {
  constructor(private readonly http: HttpService) {}

  async getCurrentCity(lon: string, lat: string, currentLang: string) {
    if (process.env.OPENWEATHER_API_KEY === undefined) {
      throw new NotFoundException(lang[currentLang].global.apiKeyNotProvided);
    }

    if (lon === undefined || lat === undefined) {
      throw new NotFoundException(
        lang[currentLang].controllers.openWeather.coordinatesNotProvided,
      );
    }

    let response;

    try {
      response = await this.http
        .get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`,
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
