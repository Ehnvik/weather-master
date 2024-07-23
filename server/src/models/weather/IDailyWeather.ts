import { IFeelsLike } from "./IFeelsLike";
import { ITemp } from "./ITemp";
import { IWeather } from "./IWeather";

export interface IDailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: ITemp;
  feels_like: IFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeather[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}
