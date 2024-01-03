import { useContext } from "react";
import { AuthenticationContextProvider } from "../context/AuthenticationProvider";

export default function useAuthentication() {
  const context = useContext(AuthenticationContextProvider);
  if (context === undefined) throw new Error("Context is out of Range");
  return context;
}
