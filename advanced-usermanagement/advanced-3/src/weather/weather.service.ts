import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, from, lastValueFrom, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import config from 'src/config/config';
import { LocationInterface } from 'src/interface/location.interface';

@Injectable()
export class WeatherService {
  constructor(private httpService: HttpService) {}

  getWeather(location: LocationInterface): Observable<AxiosResponse<[]>> {
    const { latitude, longitude } = location;
    return from(
      this.httpService.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          config().weatherApi.key
        }&units=metric`,
      ),
    );
  }

  private formatWeatherData(weatherData: any) {
    return `today in ${weatherData.name} is ${Math.round(
      weatherData.main.temp,
    )} C\xB0`;
  }
  proceedWeatherData(location: LocationInterface) {
    return from(
      this.getWeather(location).pipe(
        map(({ data }) => this.formatWeatherData(data)),
      ),
    );
  }
}
