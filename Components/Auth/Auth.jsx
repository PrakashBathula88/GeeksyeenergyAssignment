import React, { useState } from "react";

const Auth = React.createContext({
  token: "",
  isLoggedin: false,
  Login: (token) => {},
  Logout: () => {},
  Autologout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("tokenid");
  const [token, settoken] = useState(initialToken);

  const userisloggedin = !!token;

  const loginHandler = (token) => {
    settoken(token);
    localStorage.setItem("tokenid", token);
  };

  const logoutHandler = () => {
    settoken(null);
    localStorage.removeItem("tokenid");
  };

  const AutoLogoutHandler = () => {
      settoken(null);
      localStorage.removeItem("tokenid");
  };

  const Handling = {
    token: token,
    isLoggedin: userisloggedin,
    Login: loginHandler,
    Logout: logoutHandler,
    RemoveAutologout: AutoLogoutHandler,
  };

  return (
    <Auth.Provider value={Handling}>
      {props.children}
    </Auth.Provider>
  );
};

export default Auth;
