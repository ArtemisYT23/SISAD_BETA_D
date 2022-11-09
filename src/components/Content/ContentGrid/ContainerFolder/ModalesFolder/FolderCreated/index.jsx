import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  setOpenModalFolderCreated,
  setCloseContextFolder,
} from "../../../../../../redux/states/ActionCore";
import { CreateFolderNew } from "../../../../../../redux/states/Folder";
import {
  TitleModal,
  SaveButton,
  CancelButton,
  TitleArchive,
  ContainerNameCheck,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  getNameFolderNew,
  getDescriptionFolderNew,
  getCabinetIdFolderNew,
  getFileTypeIdFolderNew,
  setClearDataFolderNew
} from "../../../../../../redux/formData/FolderData";

const useStyless = makeStyles((theme) => ({
  FolderCreated: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const FolderCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalCore, typeFileCore, folderData, cabinetCore } = useSelector(
    (store) => store
  );
  const { FolderCreated } = modalCore;
  const { FilesNewFolder } = typeFileCore;
  const { id, name, description, cabinetId, folderId, folderFileTypes } =
    folderData;
  const { SelectedCabinet } = cabinetCore;

  useEffect(() => {
    dispatch(getCabinetIdFolderNew(SelectedCabinet?.id));
  }, [FolderCreated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carpetas = {
      id: id,
      name: name,
      description: description,
      cabinetId: cabinetId,
      folderId: folderId,
      folderFileTypes: folderFileTypes,
    };
    console.log(carpetas);
    dispatch(CreateFolderNew(carpetas, cabinetId));
    OpenModalCreatedFolder();
  };

  const ObtenerSelected = () => {
    const checkboxes = document.querySelectorAll(
      'input[name="subject"]:checked'
    );
    const SelectedFiles = [];
    checkboxes.forEach((checkbox) => {
      SelectedFiles.push(checkbox.value);
    });
    dispatch(getFileTypeIdFolderNew(SelectedFiles));
  };

  const FolderNew = (
    <div className={styless.FolderCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Crear Carpeta</TitleModal>
        </div>
        <br />
        <TextField
          value={name}
          onChange={(e) => dispatch(getNameFolderNew(e.target.value))}
          required={true}
          label="nombre de la carpeta"
          className={styless.textfield}
        />
        <br />
        <TextField
          value={description}
          onChange={(e) => dispatch(getDescriptionFolderNew(e.target.value))}
          required={true}
          label="descripcion"
          className={styless.textfield}
        />
        <br />
        <br />
        <TitleArchive>Tipo de Archivo</TitleArchive>
        <div className="ContainerSelectedChech">
          <ContainerNameCheck>
            {FilesNewFolder ? (
              FilesNewFolder.map(({ fileTypeId, fileTypeName }, index) => (
                <div className="NameCeldaCheck">
                  <input
                    type="checkbox"
                    onChange={ObtenerSelected}
                    name="subject"
                    value={fileTypeId}
                    id={fileTypeId}
                  />
                  {fileTypeName}
                </div>
              ))
            ) : (
              <></>
            )}
          </ContainerNameCheck>
        </div>
        <br />
        <div align="right">
          {name != "" && description != "" && folderFileTypes.length != 0 ? (
            <SaveButton>Crear</SaveButton>
          ) : (
            <></>
          )}
          <CancelButton onClick={() => OpenModalCreatedFolder()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalCreatedFolder = () => {
    dispatch(setOpenModalFolderCreated(false));
    dispatch(setCloseContextFolder(false));
    dispatch(setClearDataFolderNew());
  };

  return (
    <div className={styless.container}>
      <Modal open={FolderCreated} onClose={OpenModalCreatedFolder}>
        {FolderNew}
      </Modal>
    </div>
  );
};

export default FolderCreated;
