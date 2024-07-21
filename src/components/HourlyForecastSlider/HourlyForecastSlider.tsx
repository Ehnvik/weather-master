import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HourlyForecastSlider.scss";
import { useWeather } from "../../contexts/WeatherContext";
import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { images } from "../../modules/images";
import { IHourlyWeather } from "../../models/Weather/Interfaces/IHourlyWeather";
import { HourlyWeather } from "../../models/Weather/Classes/HourlyWeather";
import { CustomSwiper } from "../CustomSwiper/CustomSwiper";

export const HourlyForecastSlider = () => {
  const [hourlyWeatherList, setHourlyWeatherList] = useState<HourlyWeather[]>(
    [],
  );
  const { weatherLocationData } = useWeather();

  useEffect(() => {
    const hourlyWeatherList: HourlyWeather[] = [];
    for (let i = 0; i < 12; i++) {
      const hourlyWeather = weatherLocationData.weatherData.hourly[i];
      const time = convertUnixTime(hourlyWeather, i);
      const icon = findCorrectWeatherIcon(hourlyWeather.weather[0].icon);
      const temp = formatHourlyWeatherTemp(hourlyWeather);
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

  const convertUnixTime = (hourlyWeather: IHourlyWeather, index: number) => {
    if (index === 0) {
      return "Now";
    } else {
      const date = new Date(hourlyWeather.dt * 1000);
      return formatInTimeZone(
        date,
        weatherLocationData.weatherData.timezone,
        "HH:mm",
      );
    }
  };

  const findCorrectWeatherIcon = (icon: string) => {
    return images.find((image) => image.id === icon);
  };

  const formatHourlyWeatherTemp = (hourlyWeather: IHourlyWeather) => {
    return Math.round(hourlyWeather.temp);
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
