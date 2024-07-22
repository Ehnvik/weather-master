import { initialLocationDetails } from "../location/initialLocationDetails";
import { initialFormattedUnits } from "./initialFormattedUnits";
import { initialWeatherIcon } from "./initialWeatherIcon";
import { initialWeatherResponse } from "./initialWeatherResponse";

export const initialWeatherLocationData = {
  formattedUnits: initialFormattedUnits,
  icon: initialWeatherIcon,
  location: initialLocationDetails,
  weatherData: initialWeatherResponse,
};
