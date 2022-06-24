import axios from "axios";

const rootApiPath = "https://localhost:44373/api/Pedido/";

export const getPedidos = async () => {
  try {
    const response = await axios.get(rootApiPath);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putPedido = async (codigo, nuevoEstado) => {
  try {
    const body = {
      _estado: nuevoEstado,
    };
    const response = await axios.put(rootApiPath + codigo, body);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
