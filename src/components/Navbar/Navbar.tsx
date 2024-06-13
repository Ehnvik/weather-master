import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/weather-logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to={"/"}>
          <img src={logo} alt="Weather Master Logo" />
        </Link>

        <button className="navbar__toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul
        className={`navbar__list ${isOpen ? "navbar__list--open" : ""}`}
        ref={menuRef}>
        <li className="navbar__link">
          <NavLink to="/" onClick={handleClick}>
            Today
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to="/hourly" onClick={handleClick}>
            Hourly
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to="/daily" onClick={handleClick}>
            Daily
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
