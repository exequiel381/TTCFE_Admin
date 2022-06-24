import React, { useEffect, useState } from "react";
import { StyleContainer } from "../../components/StyledComponents/StyleContainer";
import Table from "../../components/Table/Table";
import "./admin.css";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { getPedidos, putPedido } from "../../apiCalls/adminApiCalls";
import Loader from "../../components/Loader/Loader";
import ModalComponent from "../../components/Modal/Modal";

const colums = [
  {
    key: "_codigo",
    text: "Codigo",
  },
  {
    key: "_direccion",
    text: "Direccion",
  },
  {
    key: "_telefono",
    text: "Telefono",
  },
  {
    key: "_tipoDeMascota",
    text: "Mascota",
  },
  {
    key: "_CantidadComplementosDietarios",
    text: "Complementos Dietarios",
    align: "right",
  },
  {
    key: "_cantidadAlimento",
    text: "Alimento(Kg)",
    align: "right",
  },
  {
    key: "_fechaCreacion",
    text: "Fecha",
  },
  {
    key: "_estado",
    text: "Estado",
  },
];

function Admin() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalProps, setModalProps] = React.useState({
    openModal: false,
    text: "",
    header: "Confirmacion",
    type: "loading",
    onConfirm: () => {},
  });

  const CompletarPedido = (codigo) => {
    setModalProps({
      openModal: true,
    });
    putPedido(codigo, 2)
      .then((response) => {
        getPedidosFromAPI();
      })
      .catch((error) => {
        setModalProps({
          openModal: false,
        });
        setLoading(false);
        console.log(error);
      });
  };

  const CancelarPedido = (codigo) => {
    putPedido(codigo, 3)
      .then((response) => {
        setModalProps({
          openModal: true,
        });
        getPedidosFromAPI();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const buttons = [
    {
      key: "viewDetail",
      text: "Completar",
      icon: faCheck,
      color: "success",
      behaviour: CompletarPedido,
    },

    {
      key: "viewDetail3",
      text: "Cancelar",
      icon: faXmark,
      color: "error",
      behaviour: CancelarPedido,
    },
  ];

  const getPedidosFromAPI = () => {
    getPedidos()
      .then((response) => {
        let res = response.map((item) => {
          return {
            ...item,
            _tipoDeMascota: item._mascota._tipoDeMascota,
            _CantidadComplementosDietarios:
              item._mascota._CantidadComplementosDietarios,
            _cantidadAlimento: item._mascota._cantidadAlimento,
          };
        });
        setPedidos(res);
        setLoading(false);
        setModalProps({
          openModal: false,
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // @DOC:Actualizamos la lista cada 5 minutos para ver pedidos nuevos, podriamos usar un servicio como signalr , pero al no considerar que tenemos una demanda demasiado constante y tiempos acotados para realizar acciones , no es necesario usarlo.
  useEffect(() => {
    getPedidosFromAPI();
    setInterval(() => {
      setLoading(true);
      getPedidosFromAPI();
    }, 300000);
  }, []);

  if (loading === true) {
    return (
      <StyleContainer>
        <Loader text="Cargando..."></Loader>
      </StyleContainer>
    );
  } else {
    return (
      <StyleContainer>
        <div className="Content">
          <h1>Listado de pedidos</h1>
          <Table
            idColumn="_codigo"
            columns={colums}
            data={pedidos}
            width="100%"
            height="700px"
            striped
            iconButtons={buttons}
          ></Table>
        </div>
        <ModalComponent
          open={modalProps.openModal}
          setModalProps={setModalProps}
          type={modalProps.type}
          header={modalProps.header}
          onConfirm={modalProps.onConfirm}
        ></ModalComponent>
      </StyleContainer>
    );
  }
}

export default Admin;
