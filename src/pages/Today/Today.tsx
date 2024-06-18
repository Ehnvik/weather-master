import { useEffect, useState } from "react";
import { fetchWeatherData } from "../../services/weatherService";
import { ICurrentWeather } from "../../models/Weather/ICurrentWeather";
import { IWeather } from "../../models/Weather/IWeather";
import { images } from "../../modules/images";
import { IWeatherIcons } from "../../models/Weather/IWeatherIcons";

const initialCurrentWeather: ICurrentWeather = {
  dt: 0,
  sunrise: 0,
  sunset: 0,
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
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
};

const initialWeatherIcon: IWeatherIcons = {
  id: "",
  src: "",
};

export const Today = () => {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>(
    initialCurrentWeather,
  );
  const [weatherIcon, setWeatherIcon] =
    useState<IWeatherIcons>(initialWeatherIcon);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWeatherData(
        "59.35856063244829",
        "17.905359111139767",
      );
      console.log(response);
      setCurrentWeather(response.current);
    };

    fetchData();
  }, []);

  const selectWeatherIcon = () => {
    images.forEach((image) => {
      if (image.id === currentWeather.weather[0].icon) {
        setWeatherIcon(image);
      }
    });
  };

  useEffect(() => {
    selectWeatherIcon();
  }, [currentWeather]);

  return (
    <div>
      <h1>Todays Weather</h1>
      <img src={weatherIcon.src} alt="Weather Icon" />
    </div>
  );
};
