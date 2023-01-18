import { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalConfigDelete } from "../../../../../../redux/states/ActionConfig";
import { setIndexCabinetDeleteConfig } from "../../../../../../redux/states/Indexes";
import { Alert } from "./Icons";
import {
  TitleModal,
  IconAlert,
  AlertDelete,
  AcepDelete,
  ContaiderButton,
  ButtonDelete,
  ButtonCancel,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import { setIdUpdateIndex, setClearUpdateIndex } from "../../../../../../redux/formData/IndexData"; 

const useStyless = makeStyles((theme) => ({
  IndexDelete: {
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

const IndexDelete = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalConfig, indexData, indexCore, cabinetCore } = useSelector(
    (store) => store
  );
  const { UpdateSelectedCabinet } = cabinetCore;
  const { IndexDelete } = modalConfig;
  const { idUpdate } = indexData;
  const { IndexSelected } = indexCore;

  useEffect(() => {
    dispatch(setIdUpdateIndex(IndexSelected?.id));
  }, [IndexDelete]);

  const [buttonActive, setButtonActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const IndexDelete = {
      id: idUpdate,
    };
    dispatch(setIndexCabinetDeleteConfig(IndexDelete, idUpdate, UpdateSelectedCabinet?.name, UpdateSelectedCabinet?.id));
    OpenModalIndexDelete();
  };

  const deleteGab = (
    <div className={styless.IndexDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>ELIMINAR ÍNDICE {name}</TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Para que el índice</label>
          <label>pueda ser eliminado</label>
          <label>no debe contener registros</label>
          <label>de datos</label>
          <AcepDelete
            onClick={() => setButtonActive(true)}
            disabled={!buttonActive}
          >
            Aceptar
          </AcepDelete>
        </AlertDelete>
        <ContaiderButton align="right">
          <ButtonDelete type="submit" disabled={!buttonActive}>
            Eliminar
          </ButtonDelete>
          <ButtonCancel onClick={() => OpenModalIndexDelete()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalIndexDelete = () => {
    setButtonActive(false);
    dispatch(setOpenModalConfigDelete(false));
    dispatch(setClearUpdateIndex());
  };

  return (
    <div className={styless.container}>
      <Modal open={IndexDelete} onClose={OpenModalIndexDelete}>
        {deleteGab}
      </Modal>
    </div>
  );
};

export default IndexDelete;
