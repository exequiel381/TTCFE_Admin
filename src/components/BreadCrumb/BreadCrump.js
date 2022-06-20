import React from "react";
import { Link } from "react-router-dom";
import { rootPath } from "../../App";
import "./BreadCrumb.css";

const BreadCrumb = (props) => {
  return (
    <div className="contenedor">
      {props.routes?.map((route, index) => {
        return (
          <div key={index}>
            <Link to={rootPath + route.path} className="Links">
              {route.title}
            </Link>
            {" > "}
          </div>
        );
      })}
      <div>
        <a className="Actual" aria-current="page">
          {props.currentRoute}
        </a>
      </div>
    </div>
  );
};

export default BreadCrumb;
