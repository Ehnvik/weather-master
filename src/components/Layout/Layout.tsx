import { useWeather } from "../../contexts/WeatherContext";
import { Airplane } from "../Animations/Airplane/Airplane";
import { Clouds } from "../Animations/Clouds/Clouds";
import "./Layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { weatherIcon } = useWeather();
  return (
    <div
      className={`background ${
        weatherIcon.id === "01d" || weatherIcon.id === "02d"
          ? "background--sun"
          : "background--cloud"
      }`}>
      <Clouds />
      <Airplane />
      <div className="layout">{children}</div>
    </div>
  );
};
