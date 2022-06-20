import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DropDown(props) {
  let NameId = props.NameId ? props.NameId : "id";

  return (
    <div>
      <FormControl sx={{ width: props.width }}>
        <InputLabel id="demo-multiple-name-label">{props.label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={props.value}
          onChange={(e) => props.set(e.target.value)}
          input={<OutlinedInput label={props.label} />}
          MenuProps={MenuProps}
        >
          {props.items.map((item) => (
            <MenuItem
              key={item[NameId]}
              value={item[NameId]}
              disabled={item.disabled}
            >
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
