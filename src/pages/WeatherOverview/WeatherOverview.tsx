import { useEffect, useState } from "react";
import "./WeatherOverview.scss";
import { TodayDetails } from "../../components/TodayDetails/TodayDetails";
import { useWeather } from "../../contexts/WeatherContext";
import { useLocation } from "../../contexts/LocationContext";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useFormatUnits } from "../../hooks/useFormatUnits";
import { FormattedWeatherUnits } from "../../models/Weather/Classes/FormattedWeatherUnits";
import { initialWeatherUnits } from "../../initialValues/weather/initialWeatherUnits";
import { WeatherDetails } from "../../components/WeatherDetails/WeatherDetails";

export const WeatherOverview = () => {
  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [weatherUnits, setWeatherUnits] =
    useState<FormattedWeatherUnits>(initialWeatherUnits);

  const { weatherData, location, getLocation, weatherIcon } = useWeather();
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
  }, [formattedUnits]);

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
        <WeatherDetails
          weatherDetails={weatherData}
          weatherUnits={weatherUnits}
        />
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
