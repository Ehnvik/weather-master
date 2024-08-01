import { formatInTimeZone } from "date-fns-tz";
import { IDailyWeather } from "../models/Weather/Interfaces/IDailyWeather";
import { IHighLowTemp } from "../models/Weather/Interfaces/IHighLowTemp";
import { IWeatherResponse } from "../models/Weather/Interfaces/IWeatherResponse";
import { images } from "../modules/images";

export const sliceDailyWeather = (dailyWeather: IDailyWeather[]) => {
  return dailyWeather.slice(1, 8);
};

export const convertUnixTime = (
  dailyWeather: IDailyWeather,
  weatherData: IWeatherResponse,
) => {
  const date = new Date(dailyWeather.dt * 1000);
  return formatInTimeZone(date, weatherData.timezone, "EEE");
};

export const findCorrectWeatherIcon = (icon: string) => {
  return images.find((image) => image.id === icon);
};

export const formatDailyWeatherTemp = (
  dailyWeather: IDailyWeather,
): IHighLowTemp => {
  const max = Math.round(dailyWeather.temp.max);
  const min = Math.round(dailyWeather.temp.min);
  return {
    max: max,
    min: min,
  };
};
