import React from "react";
import { StyleLoader } from "../StyledComponents/StyleLoader";
import "./Loader.css";

function Loader(props) {
  return (
    <>
      <div className="center-items">
        <StyleLoader className="loader"></StyleLoader>
      </div>
      <div className="center-items">
        <div className="textLoader">
          {props.text ? props.text : "...Loading"}
        </div>
      </div>
    </>
  );
}

export default Loader;
