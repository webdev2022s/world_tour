import { NavLink } from "react-router-dom";
import useCities from "../hooks/useCities";

import styles from "./CityItem.module.css";
import Button from "./Button";

const formatDate = (data) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(data));
};

export default function CityItem({ city }) {
  const { deleteSelectedCity, currentSelectedCity } = useCities();

  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  return (
    <>
      <li>
        <NavLink
          className={`${styles.cityItem} ${
            id === currentSelectedCity.id
              ? styles["cityItem--active"]
              : styles["cityItem--notActive"]
          }`}
          to={`${id}?lat=${lat}&lng=${lng}`}
        >
          <span>{emoji}</span>
          <h3>{cityName}</h3>
          <time>{formatDate(date)}</time>
          <Button
            label="&times;"
            clickFunction={(e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteSelectedCity(id);
            }}
          />
        </NavLink>
      </li>
    </>
  );
}
