import { useEffect, useState } from "react";
import {
  fetchWeatherData,
  fetchWeatherLocation,
} from "../../services/weatherService";
import { ICurrentWeather } from "../../models/Weather/ICurrentWeather";
import { images } from "../../modules/images";
import { IWeatherIcons } from "../../models/Weather/IWeatherIcons";
import "./Today.scss";
import { IHighLowTemp } from "../../models/Weather/IHighLowTemp";
import windIcon from "../../assets/wind.png";
import humidityIcon from "../../assets/humidity.png";

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

const initialHighLowTemp = {
  max: 0,
  min: 0,
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
  const [location, setLocation] = useState<string>("");
  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [highLowTemp, setHighLowTemp] = useState(initialHighLowTemp);
  const [windSpeed, setWindSpeed] = useState(0);

  useEffect(() => {
    const getCurrentWeather = async () => {
      const response = await fetchWeatherData(
        "59.35856063244829",
        "17.905359111139767",
      );
      console.log(response);
      setCurrentWeather(response.current);
      formatUnits(response.daily[0].temp, response.current.wind_speed);
    };

    getCurrentWeather();
  }, []);

  const getWeatherLocation = async () => {
    const response = await fetchWeatherLocation(
      "59.35856063244829",
      "17.905359111139767",
    );
    setLocation(response.name);
  };

  const selectWeatherIcon = () => {
    images.forEach((image) => {
      if (image.id === currentWeather.weather[0].icon) {
        setWeatherIcon(image);
      }
    });
  };

  const formatUnits = (temp: IHighLowTemp, windSpeed: number) => {
    const currentTemp: number = Math.round(currentWeather.temp);
    setCurrentTemp(currentTemp);

    const currentWindSpeed = Math.round(windSpeed);
    setWindSpeed(currentWindSpeed);

    const max: number = Math.round(temp.max);
    const min: number = Math.round(temp.min);

    setHighLowTemp((prevState) => {
      return {
        ...prevState,
        max: max,
        min: min,
      };
    });
  };

  useEffect(() => {
    getWeatherLocation();
    selectWeatherIcon();
  }, [currentWeather]);

  return (
    <div className="weather">
      <div className="weather__info">
        <img
          className="weather__info__icon"
          src={weatherIcon.src}
          alt="Weather Icon"
        />
        <h2 className="weather__info__temp">
          {currentTemp}&deg;
          <span className="weather__info__temp--celsius">C</span>
        </h2>
        <div className="weather__info__high-low-temp">
          <p>H:{highLowTemp.max}&deg;</p>
          <p>L:{highLowTemp.min}&deg;</p>
        </div>
        <h1 className="weather__info__location">{location}</h1>
        <div className="weather__extra-info">
          <div className="weather__extra-info__humidity">
            <img
              className="weather__extra-info__humidity__icon"
              src={humidityIcon}
              alt="Humidity Icon"
            />
            <div className="weather__extra-info__humidity__level">
              <p className="weather__extra-info__humidity__level--unit">
                {currentWeather.humidity}%
              </p>
              <p className="weather__extra-info__humidity__level--text">
                Humidity
              </p>
            </div>
          </div>

          <div className="weather__extra-info__wind">
            <img
              className="weather__extra-info__wind__icon"
              src={windIcon}
              alt="Wind Icon"
            />
            <div className="weather__extra-info__wind__speed">
              <p className="weather__extra-info__wind__speed--unit">
                {windSpeed}m/s
              </p>
              <p className="weather__extra-info__wind__speed--text">
                Wind Speed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
