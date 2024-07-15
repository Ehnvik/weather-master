import { FormattedWeatherUnits } from "../../models/Weather/Classes/FormattedWeatherUnits";
import { IWeatherResponse } from "../../models/Weather/Interfaces/IWeatherResponse";
import wind from "../../assets/wind-degrees.png";
import uv from "../../assets/uv.png";
import clouds from "../../assets/clouds-percentage.png";
import "./WeatherDetails.scss";

interface IWeatherInfoProps {
  weatherDetails: IWeatherResponse;
  weatherUnits: FormattedWeatherUnits;
}

export const WeatherDetails = ({
  weatherDetails,
  weatherUnits,
}: IWeatherInfoProps) => {
  return (
    <div className="details">
      <div className="details__item">
        <img className="details__icon" src={uv} alt="UV Icon" />
        <div className="details__level">
          <p className="details__unit">{weatherDetails.current.uvi}</p>
          <p className="details__text">UV Index</p>
        </div>
      </div>
      <div className="details__item">
        <img className="details__icon" src={clouds} alt="Clouds Icon" />
        <div className="details__level details__level">
          <p className="details__unit">{weatherDetails.current.clouds}%</p>
          <p className="details__text">Cloud Cover</p>
        </div>
      </div>
      <div className="details__item">
        <img className="details__icon" src={wind} alt="Wind Speed Icon" />
        <div className="details__level">
          <p className="details__unit">{weatherUnits.windSpeed} m/s</p>
          <p className="details__text">Wind Speed</p>
        </div>
      </div>
    </div>
  );
};
