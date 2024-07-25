import { IDailyWeather } from "../../models/Weather/Interfaces/IDailyWeather";

export const initialDailyWeather: IDailyWeather[] = [
  {
    dt: 0,
    sunrise: 0,
    sunset: 0,
    moonrise: 0,
    moonset: 0,
    moon_phase: 0,
    summary: "",
    temp: {
      day: 0,
      min: 0,
      max: 0,
      night: 0,
      eve: 0,
      morn: 0,
    },
    feels_like: {
      day: 0,
      night: 0,
      eve: 0,
      morn: 0,
    },
    pressure: 0,
    humidity: 0,
    dew_point: 0,
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
    clouds: 0,
    pop: 0,
    uvi: 0,
    rain: 0,
  },
];
