import styled from "styled-components";
import { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalDownloadChargedTime } from "../redux/states/ActionDocumentary";
import LoadingSpinner from "./LoadingSpinner";

const useStyless = makeStyles((theme) => ({
  modalDownload: {
    position: "absolute",
    width: "420px",
    height: "200px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    overflowY: "scroll",
    borderRadius: "13px",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const ModalDownload = () => {
  const styless = useStyless();
  const dispatch = useDispatch();

  const { modalDocumentary } = useSelector((store) => store);
  const { ChargedDownload } = modalDocumentary;

  const ChargedContainer = (
    <div className={styless.modalDownload}>
      <ContainerInfo>
        <LoadingSpinner />
        <span>Descargando ...</span>
      </ContainerInfo>
    </div>
  );

  const OpenModalChargedTime = () => {
    dispatch(setOpenModalDownloadChargedTime(false));
  };

  return (
    <div className={styless.container}>
      {/* <Modal open={ChargedDownload} onClose={OpenModalChargedTime}> */}
      <Modal open={ChargedDownload}>
        {ChargedContainer}
      </Modal>
    </div>
  );
};

export default ModalDownload;

const ContainerInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;