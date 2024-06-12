import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuHeight, setMenuHeight] = useState("0px");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(isOpen ? `${menuRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <nav className="navbar">
      <button
        className={`navbar__toggle ${isOpen ? "navbar__toggle--open" : ""}`}
        onClick={toggleMenu}>
        ☰
      </button>
      <ul
        className={`navbar__list ${isOpen ? "navbar__list--open" : ""}`}
        ref={menuRef}
        style={{ height: menuHeight, opacity: isOpen ? 1 : 0 }}>
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
