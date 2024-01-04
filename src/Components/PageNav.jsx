import { NavLink } from "react-router-dom";
import styles from "../Components/PageNav.module.css";
import LogoAppUpper from "./LogoAppUpper";
import useAuthentication from "../hooks/useAuthentication";
import Button from "../Components/Button";

function PageNav() {
  const { isAuthenticated, logout } = useAuthentication();
  return (
    <>
      <nav className={styles.nav}>
        {" "}
        <LogoAppUpper />
        <ul>
          <li>
            <NavLink to="/world_tour/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/world_tour/pricing">Pricing</NavLink>
          </li>
          <li>
            {!isAuthenticated ? (
              <NavLink
                to="/world_tour//login"
                className={`${styles.ctaLink} ${
                  isAuthenticated ? styles.hide : ""
                }`}
              >
                Login{" "}
              </NavLink>
            ) : (
              <Button label="Logout" clickFunction={logout} />
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default PageNav;
