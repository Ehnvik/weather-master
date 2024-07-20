import { useEffect, useState } from "react";
import { IWeatherIcon } from "../models/Weather/Interfaces/IWeatherIcon";
import { IWeatherResponse } from "../models/Weather/Interfaces/IWeatherResponse";
import { images } from "../modules/images";

export const useWeatherIcon = (weatherData: IWeatherResponse) => {
  const [weatherIcons, setWeatherIcons] = useState<IWeatherIcon[]>([]);

  useEffect(() => {
    const weatherIconsList: IWeatherIcon[] = [];
    images.forEach((image) => {
      if (image.id === weatherData.current.weather[0].icon) {
        weatherIconsList.push(image);
      }
    });
    setWeatherIcons(weatherIconsList);
  }, []);

  return { weatherIcons };
};
