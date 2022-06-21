import React from "react";
import { StyleContainer } from "../../components/StyledComponents/StyleContainer";
import Table from "../../components/Table/Table";
import "./admin.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const colums = [
  {
    key: "primera",
    text: "primera",
  },
  {
    key: "segunda",
    text: "segunda",
  },
];

const data = [
  {
    primera: "valor1",
    segunda: "xvalor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
  {
    primera: "vvalor1",
    segunda: "valor2",
  },
];

function admin() {
  const viewDetail = (id) => {
    console.log("Hola soy", id);
  };

  const buttons = [
    {
      key: "viewDetail",
      text: "Check",
      icon: faCheck,
      color: "success", //error, primary(por defecto)
      behaviour: viewDetail,
    },
  ];

  return (
    <StyleContainer>
      <div className="Content">
        <h1>Listado de pedidos</h1>
        <Table
          idColumn="primera"
          columns={colums}
          data={data}
          width="100%"
          height="700px"
          striped
          iconButtons={buttons}
        ></Table>
      </div>
    </StyleContainer>
  );
}

export default admin;
