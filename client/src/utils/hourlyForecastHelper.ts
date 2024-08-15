import { formatInTimeZone } from "date-fns-tz";
import { IHourlyWeather } from "../models/Weather/Interfaces/IHourlyWeather";
import { images } from "../modules/images";
import { IWeatherResponse } from "../models/Weather/Interfaces/IWeatherResponse";

export const sliceHourlyWeather = (hourlyWeather: IHourlyWeather[]) => {
  return hourlyWeather.slice(0, 12);
};

export const convertUnixTime = (
  hourlyWeather: IHourlyWeather,
  index: number,
  weatherData: IWeatherResponse,
) => {
  if (index === 0) {
    return "Now";
  } else {
    const date = new Date(hourlyWeather.dt * 1000);
    return formatInTimeZone(date, weatherData.timezone, "HH:mm");
  }
};

export const findCorrectWeatherIcon = (icon: string) => {
  return images.find((image) => image.id === icon);
};

export const formatHourlyWeatherTemp = (hourlyWeather: IHourlyWeather) => {
  return Math.round(hourlyWeather.temp);
};
