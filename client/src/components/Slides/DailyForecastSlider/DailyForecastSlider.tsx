import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./DailyForecastSlider.scss";
import { useWeather } from "../../../contexts/WeatherContext";
import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { images } from "../../../modules/images";
import { DailyWeather } from "../../../models/Weather/Classes/DailyWeather";
import { IDailyWeather } from "../../../models/Weather/Interfaces/IDailyWeather";
import { IHighLowTemp } from "../../../models/Weather/Interfaces/IHighLowTemp";
import { CustomSwiper } from "../CustomSwiper/CustomSwiper";

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
      const day = convertUnixTime(dailyWeather[i]);
      const icon = findCorrectWeatherIcon(dailyWeather[i].weather[0].icon);
      const temp = formatDailyWeatherTemp(dailyWeather[i]);
      if (icon) {
        dailyWeatherList.push(new DailyWeather(id, day, icon, temp));
      }
    }
    setHourlyWeatherList(dailyWeatherList);
  }, [weatherLocationData]);

  const sliceDailyWeather = (dailyWeather: IDailyWeather[]) => {
    return dailyWeather.slice(1, 8);
  };

  const backgroundClass = () => {
    return weatherLocationData.icon.id === "01d" ||
      weatherLocationData.icon.id === "02d"
      ? `daily-weather--sun`
      : `daily-weather--clouds`;
  };

  const convertUnixTime = (dailyWeather: IDailyWeather) => {
    const date = new Date(dailyWeather.dt * 1000);
    return formatInTimeZone(
      date,
      weatherLocationData.weatherData.timezone,
      "EEE",
    );
  };

  const findCorrectWeatherIcon = (icon: string) => {
    return images.find((image) => image.id === icon);
  };

  const formatDailyWeatherTemp = (
    dailyWeather: IDailyWeather,
  ): IHighLowTemp => {
    const max = Math.round(dailyWeather.temp.max);
    const min = Math.round(dailyWeather.temp.min);
    return {
      max: max,
      min: min,
    };
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
