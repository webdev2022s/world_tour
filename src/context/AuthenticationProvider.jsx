import { createContext, useReducer } from "react";

const AuthenticationContextProvider = createContext();

const initialState = { user: null, isAuthenticated: false, isError: "" };

const FAKE_USER = {
  name: "React",
  email: "react",
  password: "react",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "failed":
      return { ...state, isError: action.payload };
    default:
      throw new Error("Unknown Action Type");
  }
}
function AuthenticatProvider({ children }) {
  const [{ user, isAuthenticated, isError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    try {
      if (email !== FAKE_USER.email || password !== FAKE_USER.password)
        throw new Error(
          "Validation Failed Hint: username: react , password react"
        );

      if (email === FAKE_USER.email && password === FAKE_USER.password)
        dispatch({ type: "login", payload: FAKE_USER });
    } catch (err) {
      dispatch({ type: "failed", payload: err.message });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthenticationContextProvider.Provider
      value={{ user, isAuthenticated, isError, login, logout }}
    >
      {children}
    </AuthenticationContextProvider.Provider>
  );
}

export { AuthenticatProvider, AuthenticationContextProvider };
