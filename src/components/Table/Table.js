import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Header from "./Header";
import Row from "./Row";
import { orderMaxToMin, orderMinToMax } from "../../utils/utils";

export default function Table(props) {
  const [arrayForStoreSelectedRow, setArrayForStoreSelectedRow] = useState([]);
  const [orderMinToMaxState, setOrderMinToMaxState] = useState(false);
  useEffect(() => {
    setArrayForStoreSelectedRow(props.data?.map(() => false));
  }, [props.data]);
  const dataIsValid = () => {
    if (!props.data || !props.columns) return false;
    props.data.forEach((item) => {
      if (numberOfFieldsInObject(item) !== props.columns.length) return false;
    });
    return true;
  };
  const numberOfFieldsInObject = (obj) => {
    var c = 0,
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        c += 1;
      }
    }
    return c;
  };
  var buttonColumns = [];
  if (props.iconButtons !== undefined) {
    buttonColumns = props.iconButtons.map((button) => {
      return { key: button.key, text: button.text };
    });
  }
  var checkBoxButtons = [];
  if (props.checkBoxButtons !== undefined) {
    checkBoxButtons = props.checkBoxButtons.map((button) => {
      return { key: button.key, text: button.text };
    });
  }
  var radioButtons = [];
  if (props.radioButtons !== undefined) {
    radioButtons = props.radioButtons.map((button) => {
      return { key: button.key, text: button.text };
    });
  }

  const selectRow = (e) => {
    if (props.isSelectTable) {
      var index = e.target.parentElement.id.split("-")[1];
      props.selectCallBack(props.data[index][props.idColumn]);
      if (arrayForStoreSelectedRow) {
        var aux = arrayForStoreSelectedRow.map(() => false);
        aux[index] = true;
        setArrayForStoreSelectedRow([...aux]);
      }
    }
  };

  const onClickHeader = (columnKey) => {
    if (props.data?.length !== 0) {
      let orderData = [];
      if (orderMinToMaxState) {
        orderData = orderMaxToMin(
          props.data,
          columnKey,
          props.auxColumn,
          props.correctColumn
        );
      } else {
        orderData = orderMinToMax(
          props.data,
          columnKey,
          props.auxColumn,
          props.correctColumn
        );
      }
      setOrderMinToMaxState(!orderMinToMaxState);
    }
  };

  const columns = props.columns
    ?.concat(buttonColumns)
    .concat(checkBoxButtons)
    .concat(radioButtons);
  if (dataIsValid()) {
    var i = 0;
    return props.loadingData ? (
      <Loader></Loader>
    ) : (
      <>
        <div
          className="table-container"
          style={{
            maxWidth: props.width ? props.width : "auto",
            minWidth: props.width ? props.width : "auto",
            maxHeight: props.height ? props.height : "auto",
          }}
        >
          <table
            className={props.striped ? "striped" : ""}
            id={props.tableId ? props.tableId : "tableId"}
          >
            <Header
              tableId={props.tableId ? props.tableId : "tableId"}
              columns={columns}
              isSelectTable={props.isSelectTable}
              isCopyTable={props.isCopyTable}
              iconButtons={props.iconButtons}
              checkBoxButtons={props.checkBoxButtons}
              onClickHeader={props.NoSort ? () => {} : onClickHeader}
            />
            <tbody>
              {props.data.map((dataRow) => {
                return (
                  <Row
                    tableId={props.tableId ? props.tableId : "tableId"}
                    rowHeight={props.rowHeight ? props.rowHeight : "30px"}
                    colorsOfEachCellInEditableRow={
                      props.colorsOfEachCellInEditableRow
                    }
                    onClick={selectRow}
                    key={i++}
                    id={"row-" + i}
                    dataRow={dataRow}
                    columns={props.columns}
                    isSelectTable={props.isSelectTable}
                    isSelected={
                      arrayForStoreSelectedRow
                        ? arrayForStoreSelectedRow[i]
                        : false
                    }
                    isCopyTable={props.isCopyTable}
                    iconButtons={props.iconButtons}
                    idColumn={props.idColumn}
                    idColumn2={props.idColumn2}
                    checkBoxButtons={props.checkBoxButtons}
                    onChangeValue={props.onChangeValue}
                    onBlur={props.onBlur}
                    changeColor={props.changeColor}
                    rowsToColor={props.rowsToColor}
                    columnsToColor={props.columnsToColor}
                    fontSize={props.fontSize ? props.fontSize : "18px"}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    return <Loader></Loader>;
  }
}
