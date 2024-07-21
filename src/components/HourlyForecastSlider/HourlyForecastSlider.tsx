import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./HourlyForecastSlider.scss";
import { useWeather } from "../../contexts/WeatherContext";
import { useEffect, useRef, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { images } from "../../modules/images";
import { IHourlyWeather } from "../../models/Weather/Interfaces/IHourlyWeather";
import { HourlyWeather } from "../../models/Weather/Classes/HourlyWeather";
import { useLocation } from "react-router-dom";
import SwiperCore from "swiper";

export const DailyForecastSlider = () => {
  const [hourlyWeatherList, setHourlyWeatherList] = useState<HourlyWeather[]>(
    [],
  );
  const { weatherLocationData } = useWeather();
  const swiperRef = useRef<SwiperCore | null>(null);
  const location = useLocation();

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

  useEffect(() => {
    const resetSwiper = () => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(0);
      }
    };

    resetSwiper();
  }, [location]);

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

  return (
    <div className="swiper_container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={"auto"}
        spaceBetween={20}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-wrapper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}>
        {displayHourlyWeatherList}
      </Swiper>
      <div className="arrow-container">
        <FontAwesomeIcon
          className="arrow-left arrow"
          icon={faArrowAltCircleLeft}
        />
        <div className="swiper-pagination"></div>

        <FontAwesomeIcon
          className="arrow-right arrow"
          icon={faArrowAltCircleRight}
        />
      </div>
    </div>
  );
};
