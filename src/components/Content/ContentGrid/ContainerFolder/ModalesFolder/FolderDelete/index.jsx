import { useEffect, useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFolderCore } from "../../../../../../redux/states/Folder";
import { setOpenModalFolderDelete } from "../../../../../../redux/states/ActionCore";
import {
  saveIdFolderSelectedUpdate,
  saveCabinetIdFolderSelectedUpdate,
  setClearFolderDataUpdate
} from "../../../../../../redux/formData/FolderData";
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
  FolderDelete: {
    position: "absolute",
    with: "400px",
    backgroundColor: "white",
    border: "2px solid white",
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

const FolderDelete = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalCore, folderCore, folderData } = useSelector((store) => store);
  const { FolderDelete } = modalCore;
  const { SelectedUpdateFolder } = folderCore;
  const { idUpdate, CabinetIdUpdate } = folderData;
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    dispatch(saveIdFolderSelectedUpdate(SelectedUpdateFolder?.id));
    dispatch(saveCabinetIdFolderSelectedUpdate(SelectedUpdateFolder?.cabinetId));
  }, [FolderDelete]);

  const handleSubmit = async (e) => {
    setButtonActive(false);
    const folde = {
      id: idUpdate,
    };
    console.log(folde);
    dispatch(DeleteFolderCore(folde, idUpdate, CabinetIdUpdate));
    OpenModalDeleteFolder();
  };

  const deleteFolder = (
    <div className={styless.FolderDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Eliminar la carpeta {SelectedUpdateFolder?.name}</TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Para que la carpeta</label>
          <label>pueda ser eliminada</label>
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
          <ButtonCancel onClick={() => OpenModalDeleteFolder()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalDeleteFolder = () => {
    setButtonActive(false);
    dispatch(setOpenModalFolderDelete(false));
    dispatch(setClearFolderDataUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={FolderDelete} onClose={OpenModalDeleteFolder}>
        {deleteFolder}
      </Modal>
    </div>
  );
};

export default FolderDelete;
