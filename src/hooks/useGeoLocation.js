import { useReducer, useState } from "react";

const initialState = { location: null, isError: null };

function reducer(state, action) {
  switch (action.type) {
    case "dataLocation":
      return { ...state, location: action.payload };
    case "dataError":
      return { ...state, isError: action.payload };
    default:
      throw new Error("Action is not Defined");
  }
}

export default function useGeoLocation() {
  const [isLoading, setLoading] = useState(false);
  const [{ location, isError }, dispatch] = useReducer(reducer, initialState);

  const getLocation = () => {
    if (!navigator.geolocation.getCurrentPosition)
      throw new Error("Your Browser does not support GeoLocations");

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch({
          type: "dataLocation",
          payload: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        });
        setLoading(false);
      },
      (err) => {
        dispatch({ type: "dataError", payload: err.meesage });
        setLoading(false);
      }
    );
  };
  return { isLoading, isError, location, getLocation };
}
