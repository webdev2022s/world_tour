import useCities from "../hooks/useCities";

import CityItem from "./CityItem";
import Loader from "./Loader";
import styles from "./CityList.module.css";
import Message from "./Message";

function CityList() {
  const { cities, status, isLoading } = useCities();

  if (isLoading) return <Loader />;
  return (
    <>
      {status === "loading" && <Loader />}
      {!cities.length && status !== "loading" && (
        <Message>Please Enter a country</Message>
      )}
      {status === "ready" && (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem city={city} key={city.id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CityList;
