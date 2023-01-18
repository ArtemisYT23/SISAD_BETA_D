import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalTypeFileDelete } from "../../../../../../redux/states/ActionConfig";
import { DeleteTypeFileConfig } from "../../../../../../redux/states/FileType";
import {
  getIdFileTypeUpdate,
  clearFileTypeUpdate,
} from "../../../../../../redux/formData/FileTypeData";
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

const useStyless = makeStyles((theme) => ({
  TypeFileDelete: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "13px",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const TypeFileDelete = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, typeFileCore, FileTypeData } = useSelector(
    (store) => store
  );
  const { SelectedTypeFile } = typeFileCore;
  const { TypeFileDelete } = modalConfig;
  const { idUpdate } = FileTypeData;

  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    dispatch(getIdFileTypeUpdate(SelectedTypeFile?.id));
  }, [TypeFileDelete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const DeleteType = {
      id: idUpdate,
    };
    dispatch(DeleteTypeFileConfig(DeleteType, idUpdate));
    OpenModalTypeFileDelete();
  };

  const bodyUpdate = (
    <div className={styless.TypeFileDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>
            Eliminar Tipo de Archivo {SelectedTypeFile?.name}
          </TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Esta seguro</label>
          <label>de eliminar el siguiente</label>
          <label>tipo de archivo</label>
          <AcepDelete
            onClick={() => setButtonActive(true)}
            disabled={!buttonActive}
          >
            Aceptar
          </AcepDelete>
        </AlertDelete>
        <ContaiderButton align="right">
          <ButtonDelete type="submit" disabled={!buttonActive}>Eliminar</ButtonDelete>
          <ButtonCancel onClick={() => OpenModalTypeFileDelete()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalTypeFileDelete = () => {
    dispatch(setOpenModalTypeFileDelete(false));
    dispatch(clearFileTypeUpdate());
  };

  return (
    <div>
      <div className={styless.container}>
        <Modal open={TypeFileDelete} onClose={OpenModalTypeFileDelete}>
          {bodyUpdate}
        </Modal>
      </div>
    </div>
  );
};

export default TypeFileDelete;
