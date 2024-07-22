import { IWeatherIcon } from "../models/Weather/Interfaces/IWeatherIcon";

export const useWeatherBackground = (
  weatherIcon: IWeatherIcon,
  mainClass: string,
) => {
  const backgroundClass =
    weatherIcon.id === "01d" || weatherIcon.id === "02d"
      ? `${mainClass}--sun`
      : `${mainClass}--clouds`;
  return { backgroundClass };
};
