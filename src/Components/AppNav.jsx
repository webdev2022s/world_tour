import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/world_tour/App/cities"> cities</NavLink>
        </li>
        <li>
          <NavLink to="/world_tour/App/countries"> countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
