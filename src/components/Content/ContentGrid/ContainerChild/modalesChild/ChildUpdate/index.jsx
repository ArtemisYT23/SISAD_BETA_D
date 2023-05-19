import styled from "styled-components";
import { useEffect, useState } from "react";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFolderChildCore } from "../../../../../../redux/states/Folder";
import { setOpenModalChildFolderUpdate } from "../../../../../../redux/states/ActionCore";
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
  saveFolderIdSelectedUpdate,
  saveFileTypeFolderSelectedUpdate,
  setClearFolderDataUpdate,
} from "../../../../../../redux/formData/FolderData";
import { Tooltip } from "@material-ui/core";

const useStyless = makeStyles((theme) => ({
  FolderUpdateChild: {
    position: "absolute",
    width: "400px",
    height: "500px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "14px 24px 20px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "13px",
    overflowY: "scroll",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    }
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const ChildUpdate = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalCore, typeFileCore, folderCore, folderData } = useSelector(
    (store) => store
  );
  const { ChildFolderUpdate } = modalCore;
  const { FilesFolders, FilesNoSelected } = typeFileCore;
  const { SelectedUpdateFolder } = folderCore;
  const [fileTypeAll, setFileTypeAll] = useState([]);
  const [term, setTerm] = useState("");
  const {
    idUpdate,
    nameUpdate,
    DescriptionUpdate,
    CabinetIdUpdate,
    folderIdUpdate,
    FileTypeUpdate,
  } = folderData;

  useEffect(() => {
    dispatch(saveIdFolderSelectedUpdate(SelectedUpdateFolder?.id));
    dispatch(saveNameFolderSelectedUpdate(SelectedUpdateFolder?.name));
    dispatch(
      saveDescriptionFolderSelectedUpdate(SelectedUpdateFolder?.description)
    );
    dispatch(saveCabinetIdFolderSelectedUpdate(SelectedUpdateFolder?.cabinetId));
    dispatch(saveFolderIdSelectedUpdate(SelectedUpdateFolder?.folderId));
      setFileTypeAll(FilesNoSelected);
  }, [ChildFolderUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const folderUpdate = {
      id: idUpdate,
      name: nameUpdate,
      description: DescriptionUpdate,
      cabinetId: CabinetIdUpdate,
      folderId: folderIdUpdate,
      folderFileTypes: FileTypeUpdate,
    };
    console.log(folderUpdate);
    dispatch(UpdateFolderChildCore(folderUpdate, idUpdate, folderIdUpdate));
    AbrirModalUpdateFolder();
  };

  const ObtenerSelected = (e) => {
    const SelectedTypes = [];
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = fileTypeAll.map((file) => {
        return { ...file, isChecked: checked };
      });
      setFileTypeAll(tempUser);
      tempUser.map((temp) => {
        if (temp.isChecked == true) {
          SelectedTypes.push(temp.fileTypeId);
        }
      });
    } else {
      let tempUser = fileTypeAll.map((file) =>
        file.fileTypeName === name ? { ...file, isChecked: checked } : file
      );
      setFileTypeAll(tempUser);
      tempUser.map((temp) => {
        if (temp.isChecked == true) {
          SelectedTypes.push(temp.fileTypeId);
        }
      });
    }
    dispatch(saveFileTypeFolderSelectedUpdate(SelectedTypes));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.fileTypeName.toLowerCase().includes(term) || !term;
    };
  }

  const UpdateFolder = (
    <div className={styless.FolderUpdateChild}>
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
            <ContainerCeldaSearch>
            <InputSearch
              type="text"
              placeholder="Buscar ..."
              onChange={(e) => setTerm(e.target.value)}
            />
            {term === "" && (
              <ContainerCeldaSelected>
                <ContainerCHeck>
                  <InputCheck
                    onChange={ObtenerSelected}
                    className="InputCheck"
                    type="checkbox"
                    name="allSelect"
                  />
                </ContainerCHeck>
                <Tooltip title={"Seleccionar Todos"}>
                  <ContainerText>SELECCIONAR TODOS</ContainerText>
                </Tooltip>
              </ContainerCeldaSelected>
            )}
          </ContainerCeldaSearch>
            {FilesNoSelected ? (
              FilesNoSelected.filter(searchingTerm(term)).map((file, index) => (
                <ContainerCeldaSelected key={index}>
                  <ContainerCHeck>
                    <InputCheck
                      onChange={ObtenerSelected}
                      type="checkbox"
                      name={file.fileTypeName}
                      value={file.fileTypeId}
                      id={file.fileTypeId}
                    />
                  </ContainerCHeck>
                  <Tooltip title={file.fileTypeName}>
                    <ContainerText>{file.fileTypeName}</ContainerText>
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
    dispatch(setOpenModalChildFolderUpdate(false));
    dispatch(setClearFolderDataUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={ChildFolderUpdate}>{UpdateFolder}</Modal>
    </div>
  );
};

export default ChildUpdate;

const InputSearch = styled.input`
  margin: 0.5rem 0 0.5rem 0;
  width: 100%;
  height: 2rem;
  outline: none;
`;

const ContainerCeldaSearch = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.1rem;
`;

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
