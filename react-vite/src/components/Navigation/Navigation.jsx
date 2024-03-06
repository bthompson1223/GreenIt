import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="nav-container">
      <li className="logo-li">
        <NavLink to="/" className="logo">
          VGHaven
        </NavLink>
      </li>

      <li className="empty"></li>

      <li className="button-container">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
