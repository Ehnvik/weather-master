import { IWeatherResponse } from "../../models/Weather/Interfaces/IWeatherResponse";
import wind from "../../assets/wind-degrees.png";
import uv from "../../assets/uv.png";
import feelsLikeIcon from "../../assets/temperature-feels-like.png";
import dewPointIcon from "../../assets/dew-point.png";
import clouds from "../../assets/clouds-percentage.png";
import visibilityIcon from "../../assets/visibility.png";
import "./TodayDetails.scss";
import { FormattedWeatherUnits } from "../../models/Weather/Classes/FormattedWeatherUnits";

interface ICollapsibleProps {
  weatherDetails: IWeatherResponse;
  weatherUnits: FormattedWeatherUnits;
}

export const TodayDetails = ({
  weatherDetails,
  weatherUnits,
}: ICollapsibleProps) => {
  return (
    <div className="info">
      <div className="info__summary">
        <h3 className="info__summary-title">
          {weatherDetails.daily[0].summary}
        </h3>
      </div>
      <div className="info__container">
        <div className="info__container__column">
          <div className="info__item">
            <img className="info__icon" src={uv} alt="UV Icon" />
            <div className="info__level">
              <p className="info__unit">{weatherDetails.current.uvi}</p>
              <p className="info__text">UV Index</p>
            </div>
          </div>
          <div className="info__item">
            <img className="info__icon" src={clouds} alt="Feels Like Icon" />
            <div className="info__level info__level">
              <p className="info__unit">{weatherDetails.current.clouds}%</p>
              <p className="info__text">Cloud Cover</p>
            </div>
          </div>
          <div className="info__item">
            <img className="info__icon" src={dewPointIcon} alt="UV Icon" />
            <div className="info__level">
              <p className="info__unit">
                {weatherUnits.dewPoint}&deg;<span>C</span>
              </p>
              <p className="info__text">Dew Point</p>
            </div>
          </div>
        </div>

        <div className="info__container__column">
          <div className="info__item">
            <img
              className="info__icon info__icon--wind-degrees"
              src={wind}
              alt="Wind Degrees Icon"
            />
            <div className="info__level">
              <p className="info__unit">
                {weatherDetails.current.wind_deg}&deg;
              </p>
              <p className="info__text">Wind Degrees</p>
            </div>
          </div>
          <div className="info__item">
            <img
              className="info__icon info__icon--feels-like"
              src={feelsLikeIcon}
              alt="Feels Like Icon"
            />
            <div className="info__level">
              <p className="info__unit">
                {weatherUnits.feelsLike}&deg;<span>C</span>
              </p>
              <p className="info__text">Feels Like</p>
            </div>
          </div>
          <div className="info__item">
            <img
              className="info__icon info__icon--feels-like"
              src={visibilityIcon}
              alt="Feels Like Icon"
            />
            <div className="info__level">
              <p className="info__unit">{weatherUnits.visibility} km</p>
              <p className="info__text">Visibility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
