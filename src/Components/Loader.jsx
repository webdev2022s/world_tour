import styles from "./Loader.module.css";
function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div>
        {" "}
        <p>Loading</p>
      </div>

      <div className="spinner"></div>
    </div>
  );
}

export default Loader;
