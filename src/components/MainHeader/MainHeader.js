import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";
import Logo from "./Logo";

const MainHeader = (props) => {
  return (
    <header className={classes["main-header"]}>
      {/* <h1>کیوت ^_^ پلنر</h1> */}
      <Logo />
      <Navigation
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      />
    </header>
  );
};

export default MainHeader;
