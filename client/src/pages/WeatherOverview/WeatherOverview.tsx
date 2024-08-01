import { useEffect, useState } from "react";
import "./WeatherOverview.scss";
import { useWeather } from "../../contexts/WeatherContext";
import { useLocation } from "../../contexts/LocationContext";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { WeatherDetails } from "../../components/WeatherDetails/WeatherDetails";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HourlyForecastSlider } from "../../components/Slides/HourlyForecastSlider/HourlyForecastSlider";
import { DailyForecastSlider } from "../../components/Slides/DailyForecastSlider/DailyForecastSlider";
import { ThreeDots } from "react-loader-spinner";
import { DailyForecast } from "../../components/DailyForecast/DailyForecast";

export const WeatherOverview = () => {
  const [activeComponent, setActiveComponent] = useState<string>("hourly");

  const { getLocation, weatherLocationData, isLoading, setIsLoading } =
    useWeather();
  const { currentLocation: currentPosition, selectedLocation } = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { geolocation } = useCurrentLocation(currentPosition);
  const { id } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      if (selectedLocation.id.toString() === id) {
        getLocation(selectedLocation);
      }
    } else {
      getLocation(geolocation);
    }
  }, [id, geolocation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [weatherLocationData]);

  const handleHourlyButtonClick = () => {
    setActiveComponent("hourly");
  };

  const handleSevenDaysButtonClick = () => {
    setActiveComponent("daily");
  };

  return isLoading ? (
    <ThreeDots
      visible={true}
      height="100"
      width="100"
      radius="9"
      color="#a5d7e8"
      ariaLabel="three-circles-loading"
      wrapperClass="loading-spinner"
    />
  ) : (
    <div className="weather">
      <div className="weather__info">
        <div className="weather__current-weather">
          <div className="weather__city-container">
            <FontAwesomeIcon
              className="weather__city-icon"
              icon={"location-dot"}
            />
            <h1 className="weather__city">
              {weatherLocationData.location.city}
            </h1>
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
            className="weather__current-weather__icon"
            src={weatherLocationData.icon.src}
            alt="Weather Icon"
          />
          <h2 className="weather__current-weather__temp">
            {weatherLocationData.formattedUnits.currentTemp}&deg;
            <span className="weather__current-weather__temp--celsius">C</span>
          </h2>
          <div className="weather__current-weather__high-low-temp">
            <p>H:{weatherLocationData.formattedUnits.maxTemp}&deg;</p>
            <p>L:{weatherLocationData.formattedUnits.minTemp}&deg;</p>
          </div>
          <h3 className="weather__description">
            {weatherLocationData.weatherData.current.weather[0].description}
          </h3>
          {screenWidth <= 768 && (
            <WeatherDetails weatherLocationData={weatherLocationData} />
          )}
        </div>
        {screenWidth > 768 && (
          <DailyForecast weatherLocationData={weatherLocationData} />
        )}
      </div>
      {screenWidth <= 768 && (
        <div className="weather__slides">
          <div className="weather__navigation">
            <button
              className={`weather__button ${
                activeComponent === "hourly" ? "active" : ""
              }`}
              onClick={handleHourlyButtonClick}>
              {activeComponent !== "hourly" && (
                <span>
                  <FontAwesomeIcon
                    className="weather__angle-left-icon"
                    icon={"angle-left"}
                  />
                </span>
              )}
              Hourly
            </button>
            <button
              className={`weather__button ${
                activeComponent === "daily" ? "active" : ""
              }`}
              onClick={handleSevenDaysButtonClick}>
              7-days
              {activeComponent !== "daily" && (
                <span>
                  <FontAwesomeIcon
                    className="weather__angle-right-icon"
                    icon={"angle-right"}
                  />
                </span>
              )}
            </button>
          </div>
          {activeComponent === "hourly" && <HourlyForecastSlider />}
          {activeComponent === "daily" && <DailyForecastSlider />}
        </div>
      )}
    </div>
  );
};
