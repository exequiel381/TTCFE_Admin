import React from "react";
import "./Main.css";

export default function Header({
  columns,
  isCopyTable,
  tableId,
  onClickHeader,
}) {
  var fixedColumnsCount = 0;
  var leftMarginAcc = 0;

  const createHtmlTableElementForCopying = () => {
    let documentTable = document.getElementById(tableId).innerHTML;
    let newElement = document.createElement("table");
    newElement.setAttribute("id", "copyrow");
    newElement.innerHTML = documentTable;
    document.getElementById("root").appendChild(newElement);
    newElement.childNodes[0].childNodes[0].childNodes[columns.length].remove();
    let copiedTableRowsCout = newElement.childNodes[1].childNodes.length;
    let index = 0;
    for (index = 0; index < copiedTableRowsCout; index++) {
      newElement.childNodes[1].childNodes[index].childNodes[
        columns.length
      ].remove();
    }
    return newElement;
  };
  const copyEvent = () => {
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
  return (
    <thead className="my-div" id="cabecera">
      <tr>
        {columns.map((column, index) => {
          var currentCellWidth = column.width ? column.width : 100;
          if (!column.isFixed && !column.width) {
            currentCellWidth = "auto";
          }
          var leftMargin = leftMarginAcc;
          if (column.isFixed) {
            leftMarginAcc += currentCellWidth;
            fixedColumnsCount++;
          }
          return (
            <th
              style={{
                height: 50,
                left: column.isFixed ? leftMargin : 0,
                minWidth: currentCellWidth,
                maxWidth: currentCellWidth,
                cursor: onClickHeader ? "pointer" : "",
                display: column.hidden ? "none" : "",
              }}
              className={
                column.isFixed
                  ? "fixed-column-head-cell columnTable"
                  : "columnTable"
              }
              id={index}
              key={index}
              onClick={() => (onClickHeader ? onClickHeader(column.key) : null)}
            >
              {column.text}{" "}
            </th>
          );
        })}
        {isCopyTable ? (
          <th align="center" className="copy-button-cell">
            <button
              className="sdds-btn sdds-btn-primary wrap-text"
              id="right-1"
              onClick={copyEvent}
            >
              Copiar Tabla
            </button>
          </th>
        ) : (
          <></>
        )}
      </tr>
    </thead>
  );
}
