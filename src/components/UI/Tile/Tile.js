import React from "react";

import "./Tile.css";

const Tile = (props) => {
  return (
    <button className={`tile ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Tile;
