import Loader from "./Loader";
import style from "./FullPageLoader.module.css";

function FullPageLoader() {
  return (
    <div className={style.fullpageloader}>
      <div className={style.center}>
        <Loader />
      </div>
    </div>
  );
}

export default FullPageLoader;
