import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HourlyForecastSlider.scss";
import { useWeather } from "../../../contexts/WeatherContext";
import { useEffect, useState } from "react";
import { HourlyWeather } from "../../../models/Weather/Classes/HourlyWeather";
import { CustomSwiper } from "../CustomSwiper/CustomSwiper";
import {
  convertUnixTime,
  findCorrectWeatherIcon,
  formatHourlyWeatherTemp,
  sliceHourlyWeather,
} from "../../../utils/hourlyForecastHelper";

export const HourlyForecastSlider = () => {
  const [hourlyWeatherList, setHourlyWeatherList] = useState<HourlyWeather[]>(
    [],
  );
  const { weatherLocationData } = useWeather();

  useEffect(() => {
    const hourlyWeatherList: HourlyWeather[] = [];
    const hourlyWeather = sliceHourlyWeather(
      weatherLocationData.weatherData.hourly,
    );

    for (let i = 0; i < hourlyWeather.length; i++) {
      const time = convertUnixTime(
        hourlyWeather[i],
        i,
        weatherLocationData.weatherData,
      );
      const icon = findCorrectWeatherIcon(hourlyWeather[i].weather[0].icon);
      const temp = formatHourlyWeatherTemp(hourlyWeather[i]);
      if (icon) {
        hourlyWeatherList.push(
          new HourlyWeather(`${Date.now()}-${Math.random()}`, temp, icon, time),
        );
      }
    }
    setHourlyWeatherList(hourlyWeatherList);
  }, [weatherLocationData]);

  const backgroundClass = () => {
    return weatherLocationData.icon.id === "01d" ||
      weatherLocationData.icon.id === "02d"
      ? `hourly-weather--sun`
      : `hourly-weather--clouds`;
  };

  const displayHourlyWeatherList = hourlyWeatherList.map((hourlyWeather) => {
    return (
      <SwiperSlide key={hourlyWeather.id}>
        <div className={`hourly-weather ${backgroundClass()}`}>
          <p className="hourly-weather__time">{hourlyWeather.time}</p>
          <img
            className="hourly-weather__icon"
            src={hourlyWeather.icon.src}
            alt="Weather Icon"
          />
          <p className="hourly-weather__temp">
            {hourlyWeather.temp}&deg;
            <span className="hourly-weather__temp--celsius">C</span>
          </p>
        </div>
      </SwiperSlide>
    );
  });

  return <CustomSwiper>{displayHourlyWeatherList}</CustomSwiper>;
};
