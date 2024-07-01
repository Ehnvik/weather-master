import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/weather-logo.png";
import { FontAwesomeIcon } from "../../modules/iconLibrary";
import { SearchLocation } from "../SearchLocation/SearchLocation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const toggleSearchContainer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to={"/"}>
          <img className="navbar__logo" src={logo} alt="Weather Master Logo" />
        </Link>

        <button className="navbar__toggle" onClick={toggleSearchContainer}>
          <FontAwesomeIcon className="navbar__search-icon" icon={"search"} />
        </button>
      </div>

      <div
        className={`navbar__search-container ${
          isOpen ? "navbar__search-container--open" : ""
        }`}
        ref={searchContainerRef}>
        <div className="navbar__close-icon-container">
          <FontAwesomeIcon
            className="navbar__close-icon"
            icon={"circle-xmark"}
            onClick={toggleSearchContainer}
          />
        </div>
        <SearchLocation />
      </div>
    </nav>
  );
};
