import { NavLink } from "react-router-dom";
import styles from "../Components/LogoAppUpper.module.css";
function LogoAppUpper() {
  return (
    <NavLink to="/world_tour/">
      <div className={styles.logo}>
        <img src="/rocket.png/" alt="upper Logo" />
        <span>My Travel List</span>
      </div>
    </NavLink>
  );
}

export default LogoAppUpper;
