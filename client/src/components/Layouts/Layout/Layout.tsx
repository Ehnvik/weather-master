import { useEffect, useState } from "react";
import { useWeather } from "../../../contexts/WeatherContext";
import { useWeatherBackground } from "../../../hooks/useWeatherBackground";
import { Airplane } from "../../Animations/Airplane/Airplane";
import { Clouds } from "../../Animations/Clouds/Clouds";
import { GeolocationPrompt } from "../../GeolocationPrompt/GeolocationPrompt";
import Cookies from "js-cookie";
import "./Layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { weatherIcon } = useWeather();
  const { backgroundClass } = useWeatherBackground(weatherIcon, "background");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const geolocationConsent = Cookies.get("geolocationConsent");
    if (!geolocationConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleCloseGeolocationPrompt = () => {
    setIsVisible(false);
  };

  return (
    <div className={`background ${backgroundClass}`}>
      <GeolocationPrompt
        isVisible={isVisible}
        onClose={handleCloseGeolocationPrompt}
      />
      <Clouds />
      <Airplane />
      <div className="layout">{children}</div>
    </div>
  );
};
