import { useEffect, useState } from "react";
import { images } from "../../modules/images";
import { IWeatherIcon } from "../../models/Weather/Interfaces/IWeatherIcon";
import "./Today.scss";
import windIcon from "../../assets/wind.png";
import humidityIcon from "../../assets/humidity.png";
import { TodayDetails } from "../../components/TodayDetails/TodayDetails";
import { useWeather } from "../../contexts/WeatherContext";
import { initialWeatherIcon } from "../../initialValues/weather/initialWeatherIcon";
import { useLocation } from "../../contexts/LocationContext";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useFormatUnits } from "../../hooks/useFormatUnits";
import { FormattedWeatherUnits } from "../../models/Weather/Classes/FormattedWeatherUnits";
import { initialWeatherUnits } from "../../initialValues/weather/initialWeatherUnits";

export const Today = () => {
  const [weatherIcon, setWeatherIcon] =
    useState<IWeatherIcon>(initialWeatherIcon);
  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [weatherUnits, setWeatherUnits] =
    useState<FormattedWeatherUnits>(initialWeatherUnits);

  const { weatherData, location, getLocation } = useWeather();
  const { currentLocation: currentPosition } = useLocation();

  const { geolocation } = useCurrentLocation(currentPosition);
  const { formattedUnits } = useFormatUnits(weatherData);

  useEffect(() => {
    getLocation(geolocation);
  }, [geolocation]);

  useEffect(() => {
    if (formattedUnits) {
      setWeatherUnits(formattedUnits);
    }
    selectWeatherIcon();
  }, [formattedUnits]);

  const selectWeatherIcon = () => {
    images.forEach((image) => {
      if (image.id === weatherData.current.weather[0].icon) {
        setWeatherIcon(image);
      }
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
          {weatherUnits.currentTemp}&deg;
          <span className="weather__info__temp--celsius">C</span>
        </h2>
        <div className="weather__info__high-low-temp">
          <p>H:{weatherUnits.maxTemp}&deg;</p>
          <p>L:{weatherUnits.minTemp}&deg;</p>
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
                {weatherUnits.windSpeed}m/s
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
          weatherUnits={weatherUnits}
        />
      ) : null}
    </div>
  );
};
