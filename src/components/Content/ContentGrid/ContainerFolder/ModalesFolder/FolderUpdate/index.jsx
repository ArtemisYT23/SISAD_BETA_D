import styled from "styled-components";
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
import { Tooltip } from "@material-ui/core";

const useStyless = makeStyles((theme) => ({
  FolderUpdate: {
    position: "absolute",
    width: "400px",
    height: "495px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "14px 24px 20px",
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
      folderFileTypes: FileTypeUpdate,
    };
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
        <br />
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
        <br />
        {FilesFolders != "" ? (
          <TitleArchive>Tipos de Archivo Existentes</TitleArchive>
        ) : (
          <TitleArchive>No tiene Archivos Configurados</TitleArchive>
        )}
        <>
          {FilesFolders != "" ? (
            <ContainerNameCheck>
              {FilesFolders ? (
                FilesFolders.map(({ fileTypeId, fileTypeName }, index) => (
                  <ContainerCeldaSelected>
                    <ContainerCHeck>
                      <InputCheck type="checkbox" checked />
                    </ContainerCHeck>
                    <Tooltip title={fileTypeName}>
                      <ContainerText>{fileTypeName}</ContainerText>
                    </Tooltip>
                  </ContainerCeldaSelected>
                ))
              ) : (
                <></>
              )}
            </ContainerNameCheck>
          ) : (
            <></>
          )}
        </>
        <br />
        <TitleArchive>Tipo de Archivo Nuevo</TitleArchive>

        <>
          <ContainerNameCheck>
            {FilesNoSelected ? (
              FilesNoSelected.map(({ fileTypeId, fileTypeName }, index) => (
                <ContainerCeldaSelected>
                  <ContainerCHeck>
                    <InputCheck
                      onChange={ObtenerSelected}
                      type="checkbox"
                      name="subject"
                      value={fileTypeId}
                      id={fileTypeId}
                    />
                  </ContainerCHeck>
                  <Tooltip title={fileTypeName}>
                    <ContainerText>{fileTypeName}</ContainerText>
                  </Tooltip>
                </ContainerCeldaSelected>
              ))
            ) : (
              <></>
            )}
          </ContainerNameCheck>
        </>

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
      <Modal open={FolderUpdate}>{UpdateFolder}</Modal>
    </div>
  );
};

export default FolderUpdate;

const ContainerCeldaSelected = styled.div`
  width: 100%;
  display: flex;
  padding: 0.1rem;
`;

const ContainerCHeck = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerText = styled.div`
  width: 240px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InputCheck = styled.input``;
