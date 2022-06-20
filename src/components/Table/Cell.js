import React, { useState } from 'react';
import './Main.css';

const Cell = (props) => {
    const [value, setValue] = useState(props.value);
    const [bgColor, setBgColor] = useState(props.isFixed ? "#C1C6D8" : props.cellBackgroundColor);

    const checkOnlyNumbers = (event) =>{
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }
    
    const checkColumnsToColor = () => {
        if(props.columnsToColor){
            const findColumn = props.columnsToColor.find(element => element === props.columnNumber.toString())
            if (findColumn) {
                return true
            }
            return false
        }
    }
    
    const styles = {
        height: props.cellHeight,
        left: props.leftMargin,
        minWidth: props.currentCellWidth,
        maxWidth: props.currentCellWidth,
        backgroundColor: (bgColor ? bgColor : (props.isFixed ? "#C1C6D8" : props.cellBackgroundColor)),
        display: (props.hidden ? "none" : ""),
        fontSize : props.fontSize ? props.fontSize : ""
    }

    return (
        <td
            style={props.value?.toString()[0] === "-" ? { ...styles, color: "red" } : { ...styles }
            }
            className={props.isFixed ? "fixed-column-cell" : "" + (checkColumnsToColor() ? "color-column" : "")}
            align={props.align ? (props.align) : ("left")}
        >
            {props.isEditable && !props.isFixed ?
                <div className="form-textfield">
                    <input className="form-control" style={{fontSize: "20px", textAlign: "right"}}  type="text" value={value} onChange={(event) => {
                        setValue(event.target.value);
                        props.onChangeValue(props.columnText, props.tableId, event.target.value);
                    }}
                    onBlur={props.onBlur}
                    onKeyPress={checkOnlyNumbers}
                    />
                </div>
                :
                <> {props.value} </>
            }
        </td>
    )
}

export default Cell
