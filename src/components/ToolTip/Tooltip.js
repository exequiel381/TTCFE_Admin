import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function ToolTip(props) {
  return (
    <>
      {props.type === "icon" ? (
        <>
          {/* placement="top-start" -- top -- center -- left -- right */}
          <Tooltip
            title={props.title}
            placement={props.placement ? props.placement : "right"}
          >
            <IconButton>
              <InfoIcon
                fontSize={props.IconFontSize ? props.IconFontSize : "large"}
                color={props.color ? props.IconColor : "error"}
              />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
      {props.type === "children" ? (
        <>
          <Tooltip
            title={props.title}
            placement={props.placement ? props.placement : "right"}
          >
            {props.children}
          </Tooltip>
        </>
      ) : null}
    </>
  );
}
