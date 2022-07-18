import React from "react";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">پروفایل</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">تنظیمات</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>خروج</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
