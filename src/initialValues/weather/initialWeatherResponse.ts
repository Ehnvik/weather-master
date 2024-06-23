import { IWeatherResponse } from "../../models/Weather/IWeatherResponse";
import { initialCurrentWeather } from "./initialCurrentWeather";
import { initialDailyWeather } from "./initialDailyWeather";
import { initialHourlyWeather } from "./initialHourlyWeather";
import { initialMinutelyWeather } from "./initialMinutelyWeather";

export const initialWeatherResponse: IWeatherResponse = {
  lat: 0,
  lon: 0,
  timezone: "",
  timezone_offset: 0,
  current: initialCurrentWeather,
  minutely: initialMinutelyWeather,
  hourly: initialHourlyWeather,
  daily: initialDailyWeather,
};
