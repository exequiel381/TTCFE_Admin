import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.css";
import { Button } from "@mui/material";
import Loader from "../Loader/Loader";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const ModalComponent = (props) => {
  const handleClose = () => props.setOpen(false);
  return (
    <Modal
      keepMounted
      open={props.open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <div
          className="modal_header"
          style={{ display: props.type === "loading" ? "none" : "" }}
        >
          <span>{props.header ? props.header : ""}</span>
          <CloseIcon
            onClick={handleClose}
            style={{ cursor: "pointer", color: "black" }}
          />
        </div>
        {props.children}
        {props.type === "deleteConfirmation" ? (
          <div>
            {props.message}
            <div className="modal_buttons">
              <Button
                variant="contained"
                color="error"
                sx={{ width: "150px", height: "60px" }}
                onClick={() => {
                  props.onDelete();
                }}
              >
                Aceptar
              </Button>
              <Button
                variant="outlined"
                sx={{ width: "150px", height: "60px" }}
                onClick={() => {
                  handleClose();
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : null}
        {props.type === "message" || props.type === "confirmation" ? (
          <div>
            {props.message}
            <div className="modal_buttons">
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "150px", height: "60px" }}
                onClick={() => {
                  props.onConfirm();
                }}
              >
                Aceptar
              </Button>
              <Button
                variant="outlined"
                sx={{ width: "150px", height: "60px" }}
                onClick={() => {
                  handleClose();
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : null}
        {props.type === "loading" ? <Loader></Loader> : null}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
