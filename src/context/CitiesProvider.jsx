import { createContext, useCallback } from "react";
import { useReducer, useEffect } from "react";

const CitiesProviderContext = createContext();

const initialState = {
  cities: [],
  status: "loading",
  currentSelectedCity: {},
  isLoading: false,
};

const API_URL = "http://localhost:3000";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "dataReceived":
      return {
        ...state,
        cities: action.payload,
        status: "ready",
        isLoading: false,
      };
    case "dataFailed":
      return { ...state, status: "Something went Wrong Please Try Again !" };
    case "dataSelectedCity":
      return {
        ...state,
        currentSelectedCity: action.payload,
        status: "ready",
        isLoading: false,
      };
    case "update":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentSelectedCity: action.payload,
        isLoading: false,
      };
    case "deleteCity":
      return {
        ...state,
        cities: state.cities.filter((data) => data.id !== action.payload),
        currentSelectedCity: {},
        isLoading: false,
      };

    default:
      throw new Error("Action Type Unkown");
  }
}

function CitiesProvider({ children }) {
  /** useReducer */
  const [{ cities, status, currentSelectedCity, isLoading }, dispatch] =
    useReducer(reducer, initialState);
  const citiesList = async () => {
    try {
      const res = await fetch(`${API_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (err) {
      dispatch({ type: "dataFailed" });
    }
  };
  useEffect(() => {
    async function cityData() {
      citiesList();
    }
    cityData();
  }, []);

  const selectedCity = useCallback(
    async (id) => {
      if (Number(id) === currentSelectedCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${API_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "dataSelectedCity", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    },
    [currentSelectedCity.id]
  );
  //adding City on the Api
  const createCity = async (newCity) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${API_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "update", payload: data });
    } catch (err) {
      dispatch({ type: "dataFailed" });
    }
  };
  //adding City on the Api
  /** useReducer */

  /**delete Cities from API */
  const deleteSelectedCity = async (id) => {
    dispatch({ type: "loading" });
    try {
      await fetch(`${API_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "deleteCity", payload: id });
    } catch (err) {
      dispatch({ type: "dataFailed" });
    }
  };
  /**delete Cities from API */
  return (
    <CitiesProviderContext.Provider
      value={{
        cities,
        status,
        selectedCity,
        currentSelectedCity,
        isLoading,
        deleteSelectedCity,
        createCity,
      }}
    >
      {children}
    </CitiesProviderContext.Provider>
  );
}

export { CitiesProvider, CitiesProviderContext };
