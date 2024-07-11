import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/weather-logo.png";
import { FontAwesomeIcon } from "../../modules/iconLibrary";
import { SearchLocation } from "../SearchLocation/SearchLocation";
import { useLocation } from "../../contexts/LocationContext";
import { SearchContext } from "../../contexts/SearchContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { requestGeolocation, setSearchValue } = useLocation();
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
        <Link onClick={requestGeolocation} to={"/"}>
          <img className="navbar__logo" src={logo} alt="Weather Master Logo" />
        </Link>

        <button className="navbar__toggle" onClick={toggleSearchContainer}>
          <FontAwesomeIcon className="navbar__search-icon" icon={"search"} />
        </button>
      </div>

      <div
        ref={searchContainerRef}
        className={`navbar__search-container ${
          isOpen
            ? "navbar__search-container--open"
            : "navbar__search-container--close"
        }`}>
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
