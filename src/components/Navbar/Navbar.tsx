import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <nav>
      <NavLink to={"/"}>Today</NavLink>
      <NavLink to={"/hourly"}>Hourly</NavLink>
      <NavLink to={"/daily"}>Daily</NavLink>
    </nav>
  );
};
