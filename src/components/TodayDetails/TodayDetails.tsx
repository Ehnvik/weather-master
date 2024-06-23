import { ReactNode } from "react";
import { ICurrentWeather } from "../../models/Weather/ICurrentWeather";

interface ICollapsibleProps {
  children?: ReactNode;
  weatherDetails: ICurrentWeather;
}

export const TodayDetails = (props: ICollapsibleProps) => {
  return (
    <div>
      <div>{props.weatherDetails.uvi}</div>
    </div>
  );
};
