import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/weather-logo.png";
import { FontAwesomeIcon } from "../../modules/iconLibrary";
import { useLocation } from "../../contexts/LocationContext";
import { SearchContext } from "../../contexts/SearchContext";
import { useWeather } from "../../contexts/WeatherContext";
import { useWeatherBackground } from "../../hooks/useWeatherBackground";
import { SearchLocation } from "../Search/SearchLocation/SearchLocation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSearchValue, getCurrentLocation, selectedLocation } =
    useLocation();
  const { weatherIcon, refreshWeatherData } = useWeather();
  const { backgroundClass } = useWeatherBackground(
    weatherIcon,
    "navbar__search-container",
  );

  const { id } = useParams();

  const handleRefreshWeatherButton = () => {
    if (id) {
      if (selectedLocation.id.toString() === id) {
        console.log("Refresh with id");

        refreshWeatherData(selectedLocation);
      }
    } else {
      console.log("Refresh geolocation");
      getCurrentLocation();
    }

    console.log("Refresh without working");
  };

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const toggleSearchContainer = () => {
    setSearchValue("");
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link onClick={getCurrentLocation} to={"/"}>
          <img className="navbar__logo" src={logo} alt="Weather Master Logo" />
        </Link>

        <div className="navbar__refresh-search-container">
          <button
            className="navbar__refresh-weather"
            onClick={handleRefreshWeatherButton}>
            <FontAwesomeIcon icon={"rotate"} />
          </button>
          <button className="navbar__toggle" onClick={toggleSearchContainer}>
            <FontAwesomeIcon className="navbar__search-icon" icon={"search"} />
          </button>
        </div>
      </div>

      <div
        ref={searchContainerRef}
        className={`navbar__search-container ${backgroundClass} ${
          isOpen
            ? `navbar__search-container--open `
            : "navbar__search-container--close"
        } `}>
        <div className="navbar__close-icon-container">
          <FontAwesomeIcon
            className="navbar__close-icon"
            icon={"circle-xmark"}
            onClick={toggleSearchContainer}
          />
        </div>
        <SearchContext.Provider value={{ isOpen, toggleSearchContainer }}>
          <SearchLocation />
        </SearchContext.Provider>
      </div>
    </nav>
  );
};
