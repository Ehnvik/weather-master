import { useEffect, useState } from "react";
import { fetchWeatherLocation } from "../../services/weatherService";
import { ICurrentWeather } from "../../models/Weather/ICurrentWeather";
import { images } from "../../modules/images";
import { IWeatherIcon } from "../../models/Weather/IWeatherIcon";
import "./Today.scss";
import { IHighLowTemp } from "../../models/Weather/IHighLowTemp";
import windIcon from "../../assets/wind.png";
import humidityIcon from "../../assets/humidity.png";
import { TodayDetails } from "../../components/TodayDetails/TodayDetails";
import { useWeather } from "../../contexts/WeatherContext";
import { initialCurrentWeather } from "../../initialValues/weather/initialCurrentWeather";
import { initialWeatherIcon } from "../../initialValues/weather/initialWeatherIcon";

const initialHighLowTemp = {
  max: 0,
  min: 0,
};

export const Today = () => {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>(
    initialCurrentWeather,
  );
  const [weatherIcon, setWeatherIcon] =
    useState<IWeatherIcon>(initialWeatherIcon);
  const [location, setLocation] = useState<string>("");
  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [highLowTemp, setHighLowTemp] = useState(initialHighLowTemp);
  const [windSpeed, setWindSpeed] = useState(0);

  const { weatherData } = useWeather();

  useEffect(() => {
    setCurrentWeather(weatherData.current);
    formatUnits(
      weatherData.daily[0].temp,
      weatherData.current.wind_speed,
      weatherData.current.temp,
    );
    getWeatherLocation();
    selectWeatherIcon();
  }, [weatherData]);

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

  const formatUnits = (
    temp: IHighLowTemp,
    windSpeed: number,
    currentTemp: number,
  ) => {
    const currentTempFormated: number = Math.round(currentTemp);
    setCurrentTemp(currentTempFormated);

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
      <TodayDetails weatherDetails={currentWeather} />
    </div>
  );
};
