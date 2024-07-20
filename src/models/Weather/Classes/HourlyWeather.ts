import { IWeatherIcon } from "../Interfaces/IWeatherIcon";

export class HourlyWeather {
  constructor(
    public temp: number,
    public icon: IWeatherIcon,
    public time: string,
  ) {}
}
