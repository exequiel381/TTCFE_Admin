import React from "react";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cell from "./Cell";
import { Button } from "@mui/material";

export default function Row({
  tableId,
  dataRow,
  columns,
  id,
  isCopyTable,
  isSelectTable,
  isSelected,
  iconButtons,
  idColumn,
  idColumn2,
  checkBoxButtons,
  onClick,
  onChangeValue,
  onBlur,
  changeColor,
  colorsOfEachCellInEditableRow,
  rowHeight,
  rowsToColor,
  columnsToColor,
  fontSize,
}) {
  var leftMarginAcc = 0;

  const createHtmlTableElementForCopying = () => {
    let documentHead = document
      .getElementById(tableId)
      .getElementsByTagName("thead")[0].innerHTML;
    let documentRow = document.getElementById(tableId + id).innerHTML;
    let newElement = document.createElement("div");
    newElement.setAttribute("id", "copyrow");
    newElement.innerHTML =
      "<table>" +
      documentHead +
      "<tbody>" +
      documentRow +
      "</tbody>" +
      "</table>";
    document.getElementById("root").appendChild(newElement);
    newElement.childNodes[0].childNodes[1].childNodes[0].childNodes[
      columns.length
    ].remove(); // this line here removes the "Copy Button" from the HEADER of the copied row element
    newElement.childNodes[0].childNodes[0].childNodes[0].childNodes[
      columns.length
    ].remove(); // this line here removes the "Copy Button" from the copied row element
    return newElement;
  };
  const copyEvent = (e) => {
    e.preventDefault();
    let elementToCopy = createHtmlTableElementForCopying();
    let range;
    let selection;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElement(elementToCopy);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      selection.removeAllRanges();
      range = document.createRange();
      range.selectNodeContents(elementToCopy);
      selection.addRange(range);
    }
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    document.getElementById("copyrow").remove();
  };
  const checkRowsToColor = () => {
    if (rowsToColor) {
      const findRow = rowsToColor.find((element) => element.id === id);
      return findRow;
    }
  };

  return (
    <tr
      onClick={onClick}
      id={tableId + id}
      className={
        (isSelectTable
          ? "selectable-row " + (isSelected ? "selected-row" : "")
          : "") + (checkRowsToColor() ? "color-row" : "")
      }
      // style={{backgroundColor: checkRowsToColor() ? checkRowsToColor().color : ""}} //Descomento si quiero escoger los colores de las filas , pero ya no queda valido por columnas
    >
      {columns.map((column, columnIndex) => {
        var cellHeight = rowHeight ? rowHeight : 70;
        var currentCellWidth = column.width ? column.width : 120;
        if (!column.isFixed && !column.width) {
          currentCellWidth = "auto";
        }
        var leftMargin = leftMarginAcc;
        if (column.isFixed) {
          leftMarginAcc += currentCellWidth;
        }
        return (
          <Cell
            columnsToColor={columnsToColor}
            columnNumber={columnIndex}
            cellHeight={cellHeight}
            value={dataRow[column.key]}
            leftMargin={leftMargin}
            currentCellWidth={currentCellWidth}
            isFixed={column.isFixed}
            key={columnIndex}
            align={column.align}
            isEditable={dataRow.isEditable}
            onChangeValue={onChangeValue}
            columnText={column.text}
            tableId={tableId}
            onBlur={onBlur}
            cellBackgroundColor={
              dataRow.isEditable && colorsOfEachCellInEditableRow
                ? colorsOfEachCellInEditableRow[columnIndex - 1]
                : ""
            }
            hidden={column.hidden}
            fontSize={fontSize}
          />
        );
      })}
      {iconButtons !== undefined ? (
        iconButtons.map((iconButton, index) => {
          return (
            <td style={{ width: "1px" }} key={index} align="center">
              <Button
                sx={{ height: "50px" }}
                color={iconButton.color ? iconButton.color : "primary"}
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  iconButton.behaviour(dataRow[idColumn], dataRow[idColumn2]);
                }}
              >
                <FontAwesomeIcon icon={iconButton.icon} />
              </Button>
            </td>
          );
        })
      ) : (
        <></>
      )}
      {checkBoxButtons !== undefined ? (
        checkBoxButtons.map((checkBox, index) => {
          return (
            <td
              style={{ width: "1px", height: rowHeight }}
              key={index}
              align="center"
            >
              <div
                className="checkbox-container"
                id={dataRow[idColumn]}
                onClick={() => {
                  checkBox.behaviour(dataRow[idColumn]);
                }}
              >
                <div className="sdds-checkbox-item">
                  <input
                    style={{ zIndex: 0 }}
                    className="sdds-form-input"
                    type="checkbox"
                    name="cb-example"
                    onChange={() => {
                      checkBox.behaviour(dataRow[idColumn]);
                    }}
                    checked={dataRow.isSelected}
                  />
                </div>
              </div>
            </td>
          );
        })
      ) : (
        <></>
      )}
      {isCopyTable ? (
        <td
          align="center"
          style={{ padding: 0 }}
          className="copy-row-button-cell"
        >
          <button
            style={{ margin: 0 }}
            onClick={copyEvent}
            className="sdds-btn sdds-btn-primary wrap-text"
            id="right-1"
          >
            Copiar Fila
          </button>
        </td>
      ) : (
        <></>
      )}
      {isCopyTable ? (
        <td
          align="center"
          style={{ padding: 0 }}
          className="copy-row-button-cell"
        >
          <button
            style={{ margin: 0 }}
            onClick={copyEvent}
            className="sdds-btn sdds-btn-primary wrap-text"
            id="right-1"
          >
            Copiar Fila
          </button>
        </td>
      ) : (
        <></>
      )}
    </tr>
  );
}
