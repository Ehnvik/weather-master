import { useEffect, useState } from "react";
import { images } from "../../modules/images";
import { IWeatherIcon } from "../../models/Weather/IWeatherIcon";
import "./Today.scss";
import { IHighLowTemp } from "../../models/Weather/IHighLowTemp";
import windIcon from "../../assets/wind.png";
import humidityIcon from "../../assets/humidity.png";
import { TodayDetails } from "../../components/TodayDetails/TodayDetails";
import { useWeather } from "../../contexts/WeatherContext";
import { initialWeatherIcon } from "../../initialValues/weather/initialWeatherIcon";

const initialHighLowTemp = {
  max: 0,
  min: 0,
};

export const Today = () => {
  const [weatherIcon, setWeatherIcon] =
    useState<IWeatherIcon>(initialWeatherIcon);
  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [highLowTemp, setHighLowTemp] = useState(initialHighLowTemp);
  const [windSpeed, setWindSpeed] = useState(0);
  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [feelsLike, setFeelsLike] = useState<number>(0);
  const [dewPoint, setDewPoint] = useState<number>(0);
  const [visibility, setVisibility] = useState(0);

  const { weatherData, location } = useWeather();

  useEffect(() => {
    formatUnits(
      weatherData.daily[0].temp,
      weatherData.current.wind_speed,
      weatherData.current.temp,
      weatherData.current.feels_like,
      weatherData.current.dew_point,
      weatherData.current.visibility,
    );

    selectWeatherIcon();
  }, [weatherData]);

  const selectWeatherIcon = () => {
    images.forEach((image) => {
      if (image.id === weatherData.current.weather[0].icon) {
        setWeatherIcon(image);
      }
    });
  };

  const roundToNearestHalf = (num: number) => {
    const intPart = Math.floor(num);
    const decimalPart = num - intPart;

    if (decimalPart < 0.25) {
      return intPart;
    } else if (decimalPart < 0.75) {
      return intPart + 0.5;
    } else {
      return intPart + 1;
    }
  };

  const formatUnits = (
    temp: IHighLowTemp,
    windSpeed: number,
    currentTemp: number,
    feelsLike: number,
    dewPoint: number,
    visibility: number,
  ) => {
    const currentTempFormatted: number = roundToNearestHalf(currentTemp);
    setCurrentTemp(currentTempFormatted);

    const currentWindSpeed = roundToNearestHalf(windSpeed);
    setWindSpeed(currentWindSpeed);

    const feelsLikeFormatted: number = roundToNearestHalf(feelsLike);
    setFeelsLike(feelsLikeFormatted);

    const dewPointFormatted: number = roundToNearestHalf(dewPoint);
    setDewPoint(dewPointFormatted);

    const visibilityFormatted: number = roundToNearestHalf(visibility / 1000);
    setVisibility(visibilityFormatted);

    const max: number = roundToNearestHalf(temp.max);
    const min: number = roundToNearestHalf(temp.min);

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
        <h1 className="weather__city">{location.city}</h1>
        <div className="weather__details">
          {location.region && (
            <p className="weather__region">{location.region}</p>
          )}
          <p className="weather__country">{location.country}</p>
        </div>
        <div className="weather__extra-info">
          <div className="weather__extra-info__humidity">
            <img
              className="weather__extra-info__humidity__icon"
              src={humidityIcon}
              alt="Humidity Icon"
            />
            <div className="weather__extra-info__humidity__level">
              <p className="weather__extra-info__humidity__level--unit">
                {weatherData.current.humidity}%
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
      <button
        className="weather__details-button"
        onClick={() => setToggleDetails(!toggleDetails)}>
        {!toggleDetails ? "More Details" : "Hide Details"}
      </button>
      {toggleDetails ? (
        <TodayDetails
          weatherDetails={weatherData}
          feelsLike={feelsLike}
          dewPoint={dewPoint}
          visibility={visibility}
        />
      ) : null}
    </div>
  );
};
