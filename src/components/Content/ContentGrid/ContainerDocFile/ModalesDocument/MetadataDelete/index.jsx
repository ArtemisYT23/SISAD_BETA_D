import { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalMetadataDelete } from "../../../../../../redux/states/ActionDocumentary";
import {
  deleteMetadataDocument,
  cleanerSelectedDocument,
} from "../../../../../../redux/states/Document";
import { Alert } from "./Icons";
import {
  TitleModal,
  IconAlert,
  AlertDelete,
  AcepDelete,
  ButtonDelete,
  ButtonCancel,
  ContaiderButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  MetadataDelete: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "13px",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const DeleteMetadata = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalDocumentary, cabinetCore, documentary } = useSelector(
    (store) => store
  );
  const { SelectedCabinet } = cabinetCore;
  const { MetadataDelete } = modalDocumentary;
  const { SelectedDocument } = documentary;
  const [buttonActive, setButtonActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonActive(false);
    dispatch(deleteMetadataDocument(SelectedDocument?.id, SelectedCabinet?.id));
    OpenModalDeleteMetadata();
  };

  const deleteMeta = (
    <div className={styless.MetadataDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>ELIMINAR EL REGISTRO</TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Para que el Registro</label>
          <label>pueda ser eliminado</label>
          <label>no debe contener archivos</label>
          <label>subidos</label>
          <AcepDelete onClick={() => setButtonActive(true)}>Aceptar</AcepDelete>
        </AlertDelete>
        <ContaiderButton align="right">
          <ButtonDelete type="submit" disabled={!buttonActive}>
            Eliminar
          </ButtonDelete>
          <ButtonCancel onClick={() => OpenModalDeleteMetadata()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalDeleteMetadata = () => {
    setButtonActive(false);
    dispatch(setOpenModalMetadataDelete(false));
    dispatch(cleanerSelectedDocument());
  };

  return (
    <div className={styless.container}>
      <Modal open={MetadataDelete} onClose={OpenModalDeleteMetadata}>
        {deleteMeta}
      </Modal>
    </div>
  );
};

export default DeleteMetadata;
