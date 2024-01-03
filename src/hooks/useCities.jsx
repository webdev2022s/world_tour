import { CitiesProviderContext } from "../context/CitiesProvider";
import { useContext } from "react";

export default function useCities() {
  const context = useContext(CitiesProviderContext);
  if (context === undefined) throw new Error("Context is out of range");
  return context;
}
