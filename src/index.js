import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./fonts/Pfont-Regular.ttf";
import "./fonts/Pfont-Bold.ttf";

import { AuthContextProvider } from "./store/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
