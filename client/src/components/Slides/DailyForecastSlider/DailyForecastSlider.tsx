import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./DailyForecastSlider.scss";
import { useWeather } from "../../../contexts/WeatherContext";
import { useEffect, useState } from "react";
import { DailyWeather } from "../../../models/Weather/Classes/DailyWeather";
import { CustomSwiper } from "../CustomSwiper/CustomSwiper";
import {
  convertUnixTime,
  findCorrectWeatherIcon,
  formatDailyWeatherTemp,
  sliceDailyWeather,
} from "../../../utils/dailyForecastHelper";

export const DailyForecastSlider = () => {
  const [dailyWeatherList, setHourlyWeatherList] = useState<DailyWeather[]>([]);
  const { weatherLocationData } = useWeather();

  useEffect(() => {
    const dailyWeatherList: DailyWeather[] = [];
    const dailyWeather = sliceDailyWeather(
      weatherLocationData.weatherData.daily,
    );

    for (let i = 0; i < dailyWeather.length; i++) {
      const id = `${Date.now()}-${Math.random()}`;
      const day = convertUnixTime(
        dailyWeather[i],
        weatherLocationData.weatherData,
      );
      const icon = findCorrectWeatherIcon(dailyWeather[i].weather[0].icon);
      const temp = formatDailyWeatherTemp(dailyWeather[i]);
      if (icon) {
        dailyWeatherList.push(new DailyWeather(id, day, icon, temp));
      }
    }
    setHourlyWeatherList(dailyWeatherList);
  }, [weatherLocationData]);

  const backgroundClass = () => {
    return weatherLocationData.icon.id === "01d" ||
      weatherLocationData.icon.id === "02d"
      ? `daily-weather--sun`
      : `daily-weather--clouds`;
  };

  const displayHourlyWeatherList = dailyWeatherList.map((dailyWeather) => {
    return (
      <SwiperSlide key={dailyWeather.id}>
        <div className={`daily-weather ${backgroundClass()}`}>
          <p className="daily-weather__day">{dailyWeather.day}</p>
          <img
            className="daily-weather__icon"
            src={dailyWeather.icon.src}
            alt="Weather Icon"
          />
          <p className="daily-weather__max-temp">
            {dailyWeather.temp.max}&deg;
            <span className="daily-weather__max-temp--celsius">C</span>
          </p>
          <p className="daily-weather__min-temp">
            {dailyWeather.temp.min}&deg;
            <span className="daily-weather__min-temp--celsius">C</span>
          </p>
        </div>
      </SwiperSlide>
    );
  });

  return <CustomSwiper>{displayHourlyWeatherList}</CustomSwiper>;
};
