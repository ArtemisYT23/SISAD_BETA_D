import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  setOpenModalChildCreated,
  setCloseContextChild,
} from "../../../../../../redux/states/ActionCore";
import { CreateFolderChildNew } from "../../../../../../redux/states/Folder";
import {
  TitleModal,
  SaveButton,
  CancelButton,
  TitleArchive,
  ContainerNameCheck,
  Selected,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  getNameFolderNew,
  getDescriptionFolderNew,
  getCabinetIdFolderNew,
  getFileTypeIdFolderNew,
  getFolderIdFolderNew,
  setClearDataFolderNew,
} from "../../../../../../redux/formData/FolderData";
import { Tooltip } from "@material-ui/core";

const useStyless = makeStyles((theme) => ({
  ChildCreated: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "14px 24px 24px",
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

const ChildCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalCore, typeFileCore, folderData, cabinetCore, folderCore } = useSelector(
    (store) => store
  );
  const { ChildCreated } = modalCore;
  const { FilesNewFolder } = typeFileCore;
  const { id, name, description, cabinetId, folderId, folderFileTypes } =
    folderData;
  const { SelectedCabinet } = cabinetCore;
  const { SelectedFolder } = folderCore;

  const [fileTypeAll, setFileTypeAll] = useState([]);

  useEffect(() => {
    dispatch(getCabinetIdFolderNew(SelectedCabinet?.id));
    dispatch(getFolderIdFolderNew(SelectedFolder?.id));
    const FilterFileType = FilesNewFolder.filter(
      (item) => item.fileTypeName !== ".PDF"
    );
    setFileTypeAll(FilterFileType);
  }, [ChildCreated]);

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
    dispatch(CreateFolderChildNew(carpetas, folderId));
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

  const ChildNew = (
    <div className={styless.ChildCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Crear Carpeta Hija</TitleModal>
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
        <>
          <ContainerNameCheck>
            {fileTypeAll ? (
              fileTypeAll.map(({ fileTypeId, fileTypeName }, index) => (
                <ContainerCeldaSelected>
                  <ContainerCHeck>
                    <InputCheck
                      type="checkbox"
                      onChange={ObtenerSelected}
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
          {name != "" && description != "" ? (
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
    dispatch(setOpenModalChildCreated(false));
    dispatch(setCloseContextChild(false));
    dispatch(setClearDataFolderNew());
  };

  return (
    <div className={styless.container}>
      <Modal open={ChildCreated} onClose={OpenModalCreatedFolder}>
        {ChildNew}
      </Modal>
    </div>
  );
};

export default ChildCreated;

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