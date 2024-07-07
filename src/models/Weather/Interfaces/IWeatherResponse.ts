import { ICurrentWeather } from "./ICurrentWeather";
import { IDailyWeather } from "./IDailyWeather";
import { IHourlyWeather } from "./IHourlyWeather";
import { IMinutelyWeather } from "./IMinutelyWeather";

export interface IWeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: ICurrentWeather;
  minutely: IMinutelyWeather[];
  hourly: IHourlyWeather[];
  daily: IDailyWeather[];
}
