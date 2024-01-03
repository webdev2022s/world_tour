import SideBar from "../Components/Sidebar";
import styles from "./Application.module.css";
import Map from "../Components/Map";
import User from "../Components/User";

function Application() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}

export default Application;
