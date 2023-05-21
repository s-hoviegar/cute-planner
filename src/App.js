import React, { useState, useEffect, useContext } from "react";

import AuthContext from "./store/auth-context";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const authCtx = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // console.log(authCtx.isLoggedIn);
    setIsLoggedIn(authCtx.isLoggedIn);
  }, [authCtx.isLoggedIn]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    authCtx.logout();
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </React.Fragment>
  );
}

export default App;
