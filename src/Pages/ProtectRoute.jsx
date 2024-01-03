import { useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const { isAuthenticated } = useAuthentication();
  const isNavigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) isNavigate("/");
  }, [isAuthenticated, isNavigate]);
  return isAuthenticated ? children : null;
}

export default ProtectRoute;
