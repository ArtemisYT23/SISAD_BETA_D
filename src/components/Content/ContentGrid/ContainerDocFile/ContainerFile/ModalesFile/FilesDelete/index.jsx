import { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalDeleteFile } from "../../../../../../../redux/states/ActionDocumentary";
import { setDeleteFileDocumentary } from "../../../../../../../redux/formData/FileData";
import { Alert } from "./Icons";
import {
    TitleModal,
    IconAlert,
    AlertDelete,
    AcepDelete,
    ContaiderButton,
    ButtonDelete,
    ButtonCancel,
  } from "../../../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  FileDelete: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    outline: "none",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const FileUploaderDelete = ({ id, name, documentId }) => {
  
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalDocumentary, filesCore } = useSelector((store) => store);
  const { FileDelete } = modalDocumentary;
  const { SelectedFile } = filesCore;
  const [buttonActive, setButtonActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = {
      id: SelectedFile?.id
    }
    OpenModalDeleteFile();
    dispatch(setDeleteFileDocumentary(file, SelectedFile?.id, SelectedFile?.documentId));
  };

  const deleteFile = (
    <div className={styless.FileDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Eliminar Archivo {name}</TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Esta seguro de </label>
          <label>Eliminar el archivo</label>
          <AcepDelete onClick={() => setButtonActive(true)} disabled={!buttonActive}>
          Aceptar
          </AcepDelete>
        </AlertDelete>
        <ContaiderButton align="right">
          <ButtonDelete type="submit" disabled={!buttonActive}>
            Eliminar
          </ButtonDelete>
          <ButtonCancel onClick={() => OpenModalDeleteFile()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalDeleteFile = () => {
    dispatch(setOpenModalDeleteFile(false));
    setButtonActive(false);
  };

  return (
    <div className={styless.container}>
      <Modal open={FileDelete} onClose={OpenModalDeleteFile}>
        {deleteFile}
      </Modal>
    </div>
  );
};

export default FileUploaderDelete;
