import { useEffect, useState } from "react";
import { FormattedWeatherUnits } from "../models/Weather/Classes/FormattedWeatherUnits";
import { IWeatherResponse } from "../models/Weather/Interfaces/IWeatherResponse";

export const useFormatUnits = (weatherData: IWeatherResponse) => {
  const [formattedUnits, setFormattedUnits] =
    useState<FormattedWeatherUnits | null>(null);

  const roundUpNumber = (temp: number) => {
    return Math.round(temp);
  };

  const roundToNearestHalf = (num: number) => {
    const intPart = Math.floor(num);
    const decimalPart = num - intPart;

    if (decimalPart < 0.25) {
      return intPart;
    } else if (decimalPart < 0.75) {
      return intPart + 0.5;
    } else {
      return intPart + 1;
    }
  };

  useEffect(() => {
    const currentTempFormatted: number = roundUpNumber(
      weatherData.current.temp,
    );

    const currentWindSpeed = roundToNearestHalf(weatherData.current.wind_speed);

    const feelsLikeFormatted: number = roundToNearestHalf(
      weatherData.current.feels_like,
    );

    const dewPointFormatted: number = roundToNearestHalf(
      weatherData.current.dew_point,
    );

    const visibilityFormatted: number = roundToNearestHalf(
      weatherData.current.visibility / 1000,
    );

    const max: number = roundUpNumber(weatherData.daily[0].temp.max);
    const min: number = roundUpNumber(weatherData.daily[0].temp.min);

    setFormattedUnits(
      new FormattedWeatherUnits(
        max,
        min,
        currentWindSpeed,
        currentTempFormatted,
        feelsLikeFormatted,
        dewPointFormatted,
        visibilityFormatted,
      ),
    );
  }, [weatherData]);

  return { formattedUnits };
};
