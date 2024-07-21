import { useEffect } from "react";
import "./WeatherOverview.scss";
import { useWeather } from "../../contexts/WeatherContext";
import { useLocation } from "../../contexts/LocationContext";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { WeatherDetails } from "../../components/WeatherDetails/WeatherDetails";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DailyForecastSlider } from "../../components/HourlyForecastSlider/HourlyForecastSlider";

export const WeatherOverview = () => {
  const { getLocation, weatherLocationData } = useWeather();
  const { currentLocation: currentPosition, selectedLocation } = useLocation();

  const { geolocation } = useCurrentLocation(currentPosition);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      if (selectedLocation.id.toString() === id) {
        getLocation(selectedLocation);
      }
    } else {
      getLocation(geolocation);
    }
  }, [id, geolocation]);

  return (
    <div className="weather">
      <div className="weather__info">
        <div className="weather__city-container">
          <FontAwesomeIcon
            className="weather__city-icon"
            icon={"location-dot"}
          />
          <h1 className="weather__city">{weatherLocationData.location.city}</h1>
        </div>
        <div className="weather__details">
          {weatherLocationData.location.region && (
            <p className="weather__region">
              {weatherLocationData.location.region}
            </p>
          )}
          <p className="weather__country">
            {weatherLocationData.location.country}
          </p>
        </div>
        <img
          className="weather__info__icon"
          src={weatherLocationData.icon.src}
          alt="Weather Icon"
        />
        <h2 className="weather__info__temp">
          {weatherLocationData.formattedUnits.currentTemp}&deg;
          <span className="weather__info__temp--celsius">C</span>
        </h2>
        <div className="weather__info__high-low-temp">
          <p>H:{weatherLocationData.formattedUnits.maxTemp}&deg;</p>
          <p>L:{weatherLocationData.formattedUnits.minTemp}&deg;</p>
        </div>
        <h3 className="weather__description">
          {weatherLocationData.weatherData.current.weather[0].description}
        </h3>
        <WeatherDetails weatherLocationData={weatherLocationData} />
      </div>
      <div className="weather__navigation">
        <button className="weather__today-button">
          <span>
            <FontAwesomeIcon icon={"angle-left"} />
          </span>
          Today
        </button>
        <button className="weather__seven-days-button">
          7-days
          <span>
            <FontAwesomeIcon icon={"angle-right"} />
          </span>
        </button>
      </div>
      <DailyForecastSlider />
    </div>
  );
};
