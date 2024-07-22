import { IHighLowTemp } from "../Interfaces/IHighLowTemp";
import { IWeatherIcon } from "../Interfaces/IWeatherIcon";

export class DailyWeather {
  constructor(
    public id: string,
    public day: string,
    public icon: IWeatherIcon,
    public temp: IHighLowTemp,
  ) {}
}
