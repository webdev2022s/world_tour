import useCities from "../hooks/useCities";

import CountryItem from "./CountryItem";
import Loader from "./Loader";
import Message from "./Message";
import styles from "./CountryList.module.css";

export default function Country() {
  const { status, cities } = useCities();

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map((data) => data.country).includes(cur.country))
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    else return acc;
  }, []);
  return (
    <>
      {status === "loading" && <Loader />}
      {!cities.length && status !== "loading" && (
        <Message> Enter a Data!</Message>
      )}

      {status === "ready" && (
        <ul className={styles.countryList}>
          {countries.map((country, i) => (
            <CountryItem country={country} key={i} />
          ))}
        </ul>
      )}
    </>
  );
}
