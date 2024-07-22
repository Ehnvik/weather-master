import { useWeather } from "../../contexts/WeatherContext";
import { useWeatherBackground } from "../../hooks/useWeatherBackground";
import { Airplane } from "../Animations/Airplane/Airplane";
import { Clouds } from "../Animations/Clouds/Clouds";
import "./Layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { weatherIcon } = useWeather();
  const { backgroundClass } = useWeatherBackground(weatherIcon, "background");

  return (
    <div className={`background ${backgroundClass}`}>
      <Clouds />
      <Airplane />
      <div className="layout">{children}</div>
    </div>
  );
};
