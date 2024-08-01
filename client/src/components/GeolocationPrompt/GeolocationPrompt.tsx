import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import "./GeolocationPrompts.scss";
import { useLocation } from "../../contexts/LocationContext";

interface IGeolocationPromptProps {
  isVisible: boolean;
  onClose: () => void;
}

export const GeolocationPrompt = ({
  isVisible,
  onClose,
}: IGeolocationPromptProps) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const { getCurrentLocation } = useLocation();

  useEffect(() => {
    if (isVisible) setShouldRender(true);
  }, [isVisible]);

  const handleAnimationEnd = () => {
    if (!isVisible) setShouldRender(false);
  };

  const handleAnswer = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    if (id === "accept") {
      Cookies.set("geolocationConsent", "accepted", { expires: 365 });
      getCurrentLocation();
    } else {
      Cookies.set("geolocationConsent", "declined", { expires: 365 });
    }

    onClose();
  };

  return (
    shouldRender && (
      <dialog
        open={isVisible}
        onAnimationEnd={handleAnimationEnd}
        className={`geolocation-prompt ${
          isVisible
            ? `geolocation-prompt--visible`
            : `geolocation-prompt--hidden`
        }`}>
        <FontAwesomeIcon
          className="geolocation-prompt__icon"
          icon={"location-dot"}
        />
        <p className="geolocation-prompt__question">
          Do you allow access to your location for a better experience?
        </p>
        <div className="geolocation-prompt__answer">
          <button
            className="geolocation-prompt__answer--buttons"
            id="accept"
            onClick={handleAnswer}>
            Yes
          </button>
          <button
            className="geolocation-prompt__answer--buttons"
            id="decline"
            onClick={handleAnswer}>
            No
          </button>
        </div>
      </dialog>
    )
  );
};
