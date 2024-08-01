import { useEffect, useState } from "react";
import { WeatherLocationData } from "../../models/Weather/Classes/WeatherLocationData";
import { DailyWeather } from "../../models/Weather/Classes/DailyWeather";
import {
  convertUnixTime,
  findCorrectWeatherIcon,
  formatDailyWeatherTemp,
  sliceDailyWeather,
} from "../../utils/dailyForecastHelper";
import "./DailyForecast.scss";

interface IDailyForecastProps {
  weatherLocationData: WeatherLocationData;
}

export const DailyForecast = ({ weatherLocationData }: IDailyForecastProps) => {
  const [dailyWeatherList, setHourlyWeatherList] = useState<DailyWeather[]>([]);

  useEffect(() => {
    const dailyWeatherList: DailyWeather[] = [];
    const dailyWeather = sliceDailyWeather(
      weatherLocationData.weatherData.daily,
    );

    for (let i = 0; i < dailyWeather.length; i++) {
      const id = `${Date.now()}-${Math.random()}`;
      let day = convertUnixTime(
        dailyWeather[i],
        weatherLocationData.weatherData,
      );

      const icon = findCorrectWeatherIcon(dailyWeather[i].weather[0].icon);
      const temp = formatDailyWeatherTemp(dailyWeather[i]);
      const condition = dailyWeather[i].weather[0].main;

      if (icon) {
        dailyWeatherList.push(new DailyWeather(id, day, icon, temp, condition));
      }
    }
    setHourlyWeatherList(dailyWeatherList);
  }, [weatherLocationData]);

  useEffect(() => {
    console.log("Daily Forecast: ", dailyWeatherList);
  }, [dailyWeatherList]);

  return (
    <div className="daily-forecast">
      {dailyWeatherList.map((daily) => {
        return (
          <div className="daily-forecast__container" key={daily.id}>
            <p className="daily-forecast__day">{daily.day}</p>
            <div className="daily-forecast__icon-container">
              <img
                className="daily-forecast__icon"
                src={daily.icon.src}
                alt="Weather Icon"
              />
              {daily.condition && (
                <p className="daily-forecast__condition">{daily.condition}</p>
              )}
            </div>
            <div className="daily-forecast__max-min-container">
              <p className="daily-forecast__max-temp">
                {daily.temp.max}&deg;
                <span className="daily-forecast__max-temp--celsius">C</span>
              </p>
              <p className="daily-forecast__min-temp">
                {daily.temp.min}&deg;
                <span className="daily-forecast__min-temp--celsius">C</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
