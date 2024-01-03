import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import useCities from "../hooks/useCities";
import styles from "./CitySelected.module.css";
import Button from "./Button";
import Loader from "./Loader";

export default function CitySelected() {
  const backNavigate = useNavigate();

  const { id } = useParams();

  const { selectedCity, currentSelectedCity, isLoading } = useCities();

  const { cityName, emoji, date, notes } = currentSelectedCity;

  useEffect(() => {
    async function isSelectedCity() {
      selectedCity(id);
    }
    isSelectedCity();
  }, [id, selectedCity]);

  if (isLoading) return <Loader />;
  return (
    <>
      <div className={styles.citySelected}>
        <div className={styles.row}>
          <h6>{cityName}</h6>
          <h3>
            <span>{emoji} </span> {cityName}
          </h3>
        </div>

        <div>
          <h6>You went to {cityName} on</h6>
          <p>{date}</p>
        </div>
        {notes && (
          <div>
            <h6>Your notes</h6>
            <p> {notes}</p>
          </div>
        )}
        <div>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>
        <div>
          <Button label="&larr; Back" clickFunction={() => backNavigate(-1)} />
        </div>
      </div>
    </>
  );
}
