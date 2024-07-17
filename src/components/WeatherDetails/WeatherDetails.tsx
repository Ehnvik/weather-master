import wind from "../../assets/wind-degrees.png";
import uv from "../../assets/uv.png";
import clouds from "../../assets/clouds-percentage.png";
import "./WeatherDetails.scss";
import { WeatherLocationData } from "../../models/Weather/Classes/WeatherLocationData";

interface IWeatherInfoProps {
  weatherLocationData: WeatherLocationData;
}

export const WeatherDetails = ({ weatherLocationData }: IWeatherInfoProps) => {
  return (
    <div className="details">
      <div className="details__item">
        <img className="details__icon" src={uv} alt="UV Icon" />
        <div className="details__level">
          <p className="details__unit">
            {weatherLocationData.weatherData.current.uvi}
          </p>
          <p className="details__text">UV Index</p>
        </div>
      </div>
      <div className="details__item">
        <img className="details__icon" src={clouds} alt="Clouds Icon" />
        <div className="details__level details__level">
          <p className="details__unit">
            {weatherLocationData.weatherData.current.clouds}%
          </p>
          <p className="details__text">Cloud Cover</p>
        </div>
      </div>
      <div className="details__item">
        <img className="details__icon" src={wind} alt="Wind Speed Icon" />
        <div className="details__level">
          <p className="details__unit">
            {weatherLocationData.formattedUnits.windSpeed} m/s
          </p>
          <p className="details__text">Wind Speed</p>
        </div>
      </div>
    </div>
  );
};
