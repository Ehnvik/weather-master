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
    <div className="details">
      <div className="details__summary">
        <h3 className="details__summary-title">
          {weatherDetails.daily[0].summary}
        </h3>
      </div>
      <div className="details__container">
        <div className="details__container__column">
          <div className="details__item">
            <img
              className="details__icon details__icon"
              src={uv}
              alt="UV Icon"
            />
            <div className="details__level">
              <p className="details__unit">{weatherDetails.current.uvi}</p>
              <p className="details__text">UV Index</p>
            </div>
          </div>
          <div className="details__item">
            <img
              className="details__icon details__icon"
              src={clouds}
              alt="Feels Like Icon"
            />
            <div className="details__level details__level">
              <p className="details__unit">{weatherDetails.current.clouds}%</p>
              <p className="details__text">Cloud Cover</p>
            </div>
          </div>
          <div className="details__item">
            <img className="details__icon" src={dewPointIcon} alt="UV Icon" />
            <div className="details__level">
              <p className="details__unit">
                {weatherUnits.dewPoint}&deg;<span>C</span>
              </p>
              <p className="details__text">Dew Point</p>
            </div>
          </div>
        </div>

        <div className="details__container__column">
          <div className="details__item">
            <img
              className="details__icon details__icon--wind-degrees"
              src={wind}
              alt="Wind Degrees Icon"
            />
            <div className="details__level">
              <p className="details__unit">
                {weatherDetails.current.wind_deg}&deg;
              </p>
              <p className="details__text">Wind Degrees</p>
            </div>
          </div>
          <div className="details__item">
            <img
              className="details__icon details__icon--feels-like"
              src={feelsLikeIcon}
              alt="Feels Like Icon"
            />
            <div className="details__level details__level">
              <p className="details__unit">
                {weatherUnits.feelsLike}&deg;<span>C</span>
              </p>
              <p className="details__text">Feels Like</p>
            </div>
          </div>
          <div className="details__item">
            <img
              className="details__icon details__icon--feels-like"
              src={visibilityIcon}
              alt="Feels Like Icon"
            />
            <div className="details__level details__level">
              <p className="details__unit">{weatherUnits.visibility} km</p>
              <p className="details__text">Visibility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
