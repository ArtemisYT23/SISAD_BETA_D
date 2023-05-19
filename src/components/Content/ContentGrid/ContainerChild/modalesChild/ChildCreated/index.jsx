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
    height: "480px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "14px 24px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
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
  const [term, setTerm] = useState("");

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
    dispatch(getFileTypeIdFolderNew(SelectedTypes));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.fileTypeName.toLowerCase().includes(term) || !term;
    };
  }

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
            {fileTypeAll ? (
              fileTypeAll.filter(searchingTerm(term)).map((file, index) => (
                <ContainerCeldaSelected key={index}>
                  <ContainerCHeck>
                    <InputCheck
                      type="checkbox"
                      onChange={ObtenerSelected}
                      name={file.fileTypeName}
                      value={file.fileTypeId}
                      id={file.fileTypeId}
                      checked={file?.isChecked || false}
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