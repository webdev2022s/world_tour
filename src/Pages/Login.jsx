import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "../Components/PageNav";
import styles from "../Pages/Login.module.css";
import Button from "../Components/Button";
import useAthentication from "../hooks/useAuthentication";
import Message from "../Components/Message";

function Login() {
  const [isUsername, setUsername] = useState({ username: "", password: "" });
  const { login, isAuthenticated, isError } = useAthentication();
  const isNavigate = useNavigate();
  const handleFormLogin = (e) => {
    e.preventDefault();
    if (isUsername) login(isUsername.username, isUsername.password);
    setUsername({ username: "", password: "" });
  };

  useEffect(() => {
    if (isAuthenticated) return isNavigate("/app", { replace: true });
  }, [isAuthenticated, isNavigate]);
  return (
    <main className={styles.login}>
      <PageNav />
      <form onSubmit={handleFormLogin}>
        <div className="row">
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            value={isUsername.username}
            onChange={(e) =>
              setUsername((data) => ({ ...data, username: e.target.value }))
            }
          />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={isUsername.password}
            onChange={(e) =>
              setUsername((data) => ({ ...data, password: e.target.value }))
            }
          />
        </div>
        <div className="row">
          <Button label="Login" />
        </div>
      </form>
      {isError && <Message>{isError}</Message>}
    </main>
  );
}

export default Login;
