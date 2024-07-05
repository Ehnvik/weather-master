import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/weather-logo.png";
import { FontAwesomeIcon } from "../../modules/iconLibrary";
import { SearchLocation } from "../SearchLocation/SearchLocation";
import { NavbarContext } from "../../contexts/NavbarContext";
import { useLocation } from "../../contexts/LocationContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSearchValue } = useLocation();

  const toggleSearchContainer = () => {
    setSearchValue("");
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
        }`}>
        <div className="navbar__close-icon-container">
          <FontAwesomeIcon
            className="navbar__close-icon"
            icon={"circle-xmark"}
            onClick={toggleSearchContainer}
          />
        </div>
        <NavbarContext.Provider value={{ isOpen, toggleSearchContainer }}>
          <SearchLocation />
        </NavbarContext.Provider>
      </div>
    </nav>
  );
};
