import { IHourlyWeather } from "../../models/Weather/Interfaces/IHourlyWeather";

export const initialHourlyWeather: IHourlyWeather[] = [
  {
    dt: 0,
    temp: 0,
    feels_like: 0,
    pressure: 0,
    humidity: 0,
    dew_point: 0,
    uvi: 0,
    clouds: 0,
    visibility: 0,
    wind_speed: 0,
    wind_deg: 0,
    wind_gust: 0,
    weather: [
      {
        id: 0,
        main: "",
        description: "",
        icon: "",
      },
    ],
    pop: 0,
    rain: {
      "1h": 0,
    },
  },
];
