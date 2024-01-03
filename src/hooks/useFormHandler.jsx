import { useReducer } from "react";
import useUrlPosition from "./useUrlPosition";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const initialState = {
  cityName: "",
  countryName: "",
  date: new Date(),
  isError: null,
  isLoadingLocation: false,
  notes: "",
  country: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataLocation":
      return { ...state, cityName: action.payload };
    case "dataCountryCode":
      return { ...state, countryName: action.payload };
    case "dataCountry":
      return { ...state, country: action.payload };
    case "isError":
      return { ...state, isError: action.payload };
    case "isLoading":
      return { ...state, isLoadingLocation: action.payload };
    case "date":
      return { ...state, date: action.payload };
    case "notes":
      return { ...state, notes: action.payload };
    default:
      throw new Error("Action is not Defined");
  }
}

export default function useFormHandler() {
  const [
    { cityName, countryName, date, isError, isLoadingLocation, notes, country },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [lat, lng] = useUrlPosition();

  const dataFetching = async () => {
    try {
      dispatch({ type: "isLoading", payload: true });
      dispatch({ type: "isError", payload: null });
      const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
      const data = await res.json();

      if (!data.countryCode)
        throw new Error("Data is out of range place select inside a map");
      dispatch({
        type: "dataLocation",
        payload: data.locality || data.city,
      });
      dispatch({
        type: "dataCountryCode",
        payload: data.countryCode,
      });
      dispatch({ type: "dataCountry", payload: data.countryName });
    } catch (err) {
      dispatch({ type: "isError", payload: err.message });
    } finally {
      dispatch({ type: "isLoading", payload: false });
    }
  };
  return {
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
  };
}
