import { LocationDetails } from "../../Location/Classes/LocationDetails";
import { IWeatherIcon } from "../Interfaces/IWeatherIcon";
import { IWeatherResponse } from "../Interfaces/IWeatherResponse";
import { FormattedWeatherUnits } from "./FormattedWeatherUnits";

export class WeatherLocationData {
  constructor(
    public weatherData: IWeatherResponse,
    public location: LocationDetails,
    public formattedUnits: FormattedWeatherUnits,
    public icon: IWeatherIcon,
  ) {}
}
