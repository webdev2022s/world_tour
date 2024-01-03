import { useNavigate } from "react-router-dom";

import useAuthentication from "../hooks/useAuthentication";
import styles from "./User.module.css";
import Button from "../Components/Button";

export default function User() {
  const { user, logout } = useAuthentication();
  const { name, avatar } = user;
  const isNavigate = useNavigate();
  const handleLogout = () => {
    logout();
    isNavigate("/");
  };
  return (
    <div className={styles.user}>
      <img src={avatar} alt={name} />
      <span>Welcome! {name}</span>
      <Button label="Logout" clickFunction={handleLogout} />
    </div>
  );
}
