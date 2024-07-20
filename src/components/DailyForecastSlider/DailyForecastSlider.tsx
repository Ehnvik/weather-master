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
import "./DailyForecastSlider.scss";
import { useWeather } from "../../contexts/WeatherContext";
import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { IHourlyTime } from "../../models/Weather/Interfaces/IHourlyTime";
import { images } from "../../modules/images";
import { IWeatherIcon } from "../../models/Weather/Interfaces/IWeatherIcon";
import { IHourlyWeather } from "../../models/Weather/Interfaces/IHourlyWeather";
import { HourlyWeather } from "../../models/Weather/Classes/HourlyWeather";

export const DailyForecastSlider = () => {
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
        hourlyWeatherList.push(new HourlyWeather(temp, icon, time));
      }
    }
    console.log(hourlyWeatherList);

    setHourlyWeatherList(hourlyWeatherList);
  }, [weatherLocationData]);

  const convertUnixTime = (hourlyWeather: IHourlyWeather, index: number) => {
    if (index === 0) {
      return "Now";
    } else {
      const date = new Date(hourlyWeather.dt * 1000);
      return formatInTimeZone(
        date,
        weatherLocationData.weatherData.timezone,
        "HH:mm:ss",
      );
    }
  };

  const findCorrectWeatherIcon = (icon: string) => {
    return images.find((image) => image.id === icon);
  };

  const formatHourlyWeatherTemp = (hourlyWeather: IHourlyWeather) => {
    return Math.round(hourlyWeather.temp);
  };

  return (
    <div className="swiper_container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-wrapper">
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="Nature 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            alt="Nature 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            alt="Nature 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt="Nature 4"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            alt="Nature 5"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-6.jpg"
            alt="Nature 6"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-7.jpg"
            alt="Nature 7"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-8.jpg"
            alt="Nature 8"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-9.jpg"
            alt="Nature 9"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            alt="Nature 5"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-6.jpg"
            alt="Nature 6"
          />
        </SwiperSlide>
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
