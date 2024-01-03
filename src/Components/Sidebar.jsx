import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import LogoAppUpper from "./LogoAppUpper";
import styles from "./SideBar.module.css";
export default function SideBar() {
  return (
    <>
      <div className={styles.sidebar}>
        <LogoAppUpper />
        <AppNav />

        <Outlet />
        {/** show the path outlet URL */}

        <footer>
          <p className="copyright">
            &copy; Copyrigth {new Date().getFullYear()} My Travel List!
          </p>
        </footer>
      </div>
    </>
  );
}
