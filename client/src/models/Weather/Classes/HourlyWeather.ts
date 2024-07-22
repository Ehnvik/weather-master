import { IWeatherIcon } from "../Interfaces/IWeatherIcon";

export class HourlyWeather {
  constructor(
    public id: string,
    public temp: number,
    public icon: IWeatherIcon,
    public time: string,
  ) {}
}
