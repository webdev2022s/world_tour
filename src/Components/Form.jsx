import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import styles from "./Form.module.css";
import convertEmoji from "../script/convertEmoji";
import Loader from "./Loader";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCities from "../hooks/useCities";
import useFormHandler from "../hooks/useFormHandler";

export default function Form() {
  const isNavigate = useNavigate();

  const { createCity, isLoading } = useCities();
  const {
    cityName,
    countryName,
    date,
    isError,
    isLoadingLocation,
    notes,
    country,
    lat,
    lng,

    dataFetching,
    dispatch,
  } = useFormHandler();

  useEffect(() => {
    if (!lat && !lng) return;
    async function dataStarting() {
      dataFetching();
    }
    dataStarting();
  }, [lat, lng]);

  const emoji = convertEmoji(countryName);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCities = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCities);
    isNavigate("/App/cities");
  };

  if (isLoadingLocation) return <Loader />;

  if (!lat && !lng)
    return <Message>Please Click Somewhere in the Map 🌝</Message>;

  if (isError) return <Message>{isError} 🤬</Message>;

  return (
    <>
      <form
        className={`${styles.form} ${isLoading ? styles.loading : ""}`}
        onSubmit={handleForm}
      >
        <div className={styles.row}>
          <label htmlFor="cityname">City Name</label>
          <input
            type="text"
            id="cityname"
            value={cityName}
            onChange={(e) =>
              dispatch({ type: "dataLocation", payload: e.target.value })
            }
          />
          <span className={styles.flag}>{emoji}</span>
        </div>
        <div className={styles.row}>
          <label htmlFor="location">When did you go to? </label>
          <DatePicker
            id="location"
            selected={date}
            onChange={(date) => dispatch({ type: "date", payload: date })}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="note">Notes about your trip to</label>
          <textarea
            type="text"
            id="note"
            value={notes}
            onChange={(e) =>
              dispatch({ type: "notes", payload: e.target.value })
            }
          />
        </div>
        <div className="buttons">
          <Button label="add" type="primary" />
          <Button
            type="back"
            label="&larr; Back"
            clickFunction={(e) => {
              e.preventDefault();
              isNavigate(-1);
            }}
          />
        </div>
      </form>
    </>
  );
}
