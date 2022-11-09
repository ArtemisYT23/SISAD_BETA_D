import { useEffect, useState } from "react";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFolderCore } from "../../../../../../redux/states/Folder";
import { setOpenModalFolderUpdate } from "../../../../../../redux/states/ActionCore";
import {
  TitleModal,
  TitleArchive,
  SaveButton,
  CancelButton,
  ContainerNameCheck,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  saveIdFolderSelectedUpdate,
  saveNameFolderSelectedUpdate,
  saveDescriptionFolderSelectedUpdate,
  saveCabinetIdFolderSelectedUpdate,
  saveFileTypeFolderSelectedUpdate,
  setClearFolderDataUpdate,
} from "../../../../../../redux/formData/FolderData";

const useStyless = makeStyles((theme) => ({
  FolderUpdate: {
    position: "absolute",
    with: "450px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "scroll",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const FolderUpdate = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalCore, typeFileCore, folderCore, folderData } = useSelector(
    (store) => store
  );
  const { FolderUpdate } = modalCore;
  const { FilesFolders, FilesNoSelected } = typeFileCore;
  const { SelectedUpdateFolder } = folderCore;
  const {
    idUpdate,
    nameUpdate,
    DescriptionUpdate,
    CabinetIdUpdate,
    FileTypeUpdate,
  } = folderData;

  useEffect(() => {
    dispatch(saveIdFolderSelectedUpdate(SelectedUpdateFolder?.id));
    dispatch(saveNameFolderSelectedUpdate(SelectedUpdateFolder?.name));
    dispatch(
      saveDescriptionFolderSelectedUpdate(SelectedUpdateFolder?.description)
    );
    dispatch(
      saveCabinetIdFolderSelectedUpdate(SelectedUpdateFolder?.cabinetId)
    );
  }, [FolderUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const folderUpdate = {
      id: idUpdate,
      name: nameUpdate,
      description: DescriptionUpdate,
      cabinetId: CabinetIdUpdate,
      folderFileTypes: FileTypeUpdate
    }
    console.log(folderUpdate);
    dispatch(UpdateFolderCore(folderUpdate, idUpdate, CabinetIdUpdate));
    AbrirModalUpdateFolder();
  };

  const ObtenerSelected = () => {
    const checkboxes = document.querySelectorAll(
      'input[name="subject"]:checked'
    );
    const SelectedFiles = [];
    checkboxes.forEach((checkbox) => {
      SelectedFiles.push(checkbox.value);
    });
    dispatch(saveFileTypeFolderSelectedUpdate(SelectedFiles));
  };

  const UpdateFolder = (
    <div className={styless.FolderUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Actualizar {SelectedUpdateFolder?.name}</TitleModal>
        </div>

        <TextField
          value={nameUpdate}
          name="name"
          onChange={(e) =>
            dispatch(saveNameFolderSelectedUpdate(e.target.value))
          }
          required={true}
          className={styless.textfield}
        />
        <br />
        <TextField
          value={DescriptionUpdate}
          name="description"
          onChange={(e) =>
            dispatch(saveDescriptionFolderSelectedUpdate(e.target.value))
          }
          required={true}
          className={styless.textfield}
        />
        <br />
        {FilesFolders != "" ? (
          <TitleArchive>Tipo de Archivo Existente</TitleArchive>
        ) : (
          <TitleArchive>No tiene Archivos Configurados</TitleArchive>
        )}

        <div className="ContainerSelectedChech">
          {FilesFolders != "" ? (
            <ContainerNameCheck>
              {FilesFolders ? (
                FilesFolders.map(({ fileTypeId, fileTypeName }, index) => (
                  <div className="NameCeldaCheck">
                    <input type="checkbox" checked />
                    {fileTypeName}
                  </div>
                ))
              ) : (
                <></>
              )}
            </ContainerNameCheck>
          ) : (
            <></>
          )}
        </div>
        <br />
        <TitleArchive>Tipo de Archivo Nuevo</TitleArchive>

        <div className="ContainerSelectedChech">
          <ContainerNameCheck>
            {FilesNoSelected ? (
              FilesNoSelected.map(({ fileTypeId, fileTypeName }, index) => (
                <div id={fileTypeId} className="NameCeldaCheck">
                  <input
                    onChange={ObtenerSelected}
                    type="checkbox"
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
          <SaveButton>Actualizar</SaveButton>
          <CancelButton onClick={() => AbrirModalUpdateFolder()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const AbrirModalUpdateFolder = () => {
    dispatch(setOpenModalFolderUpdate(false));
    dispatch(setClearFolderDataUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={FolderUpdate} onClose={AbrirModalUpdateFolder}>
        {UpdateFolder}
      </Modal>
    </div>
  );
};

export default FolderUpdate;
