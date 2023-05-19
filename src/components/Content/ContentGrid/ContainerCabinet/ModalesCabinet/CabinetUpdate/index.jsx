import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCabinetCore } from "../../../../../../redux/states/Cabinet";
import { setOpenModalCabinetUpdate } from "../../../../../../redux/states/ActionCore";
import {
  TitleModal,
  SaveButton,
  CancelButton,
  TitleArchive,
  Selected,
  NameCelda,
  ContainerNameCheck,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  saveIdCabinetSelected,
  saveNameCabinetSelected,
  saveDescriptionSelected,
  saveGroupIdSelected,
  saveConfigCabinetUpdate,
  saveFileTypeSelected,
  changeDataCabinetUpdate,
  getGroupIdNullCabinetNew,
  setClearCabinetDataUpdate,
} from "../../../../../../redux/formData/CabinetData";
import { Tooltip } from "@material-ui/core";

import LoadingSpinner from "../../../../../../utilities/LoadingSpinner";

const useStyless = makeStyles((theme) => ({
  CabinetUpdate: {
    position: "absolute",
    width: "400px",
    height: "550px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "13px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const CabinetUpdate = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalCore, groupCore, typeFileCore, cabinetData, cabinetCore } =
    useSelector((store) => store);

  const {
    idCabinet,
    nameCabinet,
    descriptionCabinet,
    onDay,
    groupIdCabinet,
    viewModeUpdate,
    filetypeSelected,
  } = cabinetData;
  const { CabinetUpdate } = modalCore;
  const { UpdateSelectedCabinet } = cabinetCore;
  const { groups } = groupCore;
  const { FilesCabinets, FilesNoCabinets, isLoadingTypeFile } = typeFileCore;
  const [fileTypeAll, setFileTypeAll] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    dispatch(saveIdCabinetSelected(UpdateSelectedCabinet?.id));
    dispatch(saveNameCabinetSelected(UpdateSelectedCabinet?.name));
    dispatch(saveDescriptionSelected(UpdateSelectedCabinet?.description));
    dispatch(saveGroupIdSelected(UpdateSelectedCabinet?.groupId));
    dispatch(saveConfigCabinetUpdate(UpdateSelectedCabinet?.viewMode));
    setFileTypeAll(FilesNoCabinets);
  }, [CabinetUpdate]);

  const handleChange = (value) => {
    value != 0
      ? dispatch(saveGroupIdSelected(value))
      : dispatch(getGroupIdNullCabinetNew());
  };

  const handleChangeConfig = (value) => {
    dispatch(changeDataCabinetUpdate(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormData = {
      id: idCabinet,
      name: nameCabinet,
      description: descriptionCabinet,
      onDay: onDay,
      viewMode: viewModeUpdate,
      groupId: groupIdCabinet,
      fileType: filetypeSelected,
    };
    console.log(FormData);
    dispatch(UpdateCabinetCore(FormData, idCabinet, groupIdCabinet));
    abrirModalUpdateCabinet();
  };

  const ObtenerCabinet = (e) => {
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
    dispatch(saveFileTypeSelected(SelectedTypes));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.fileTypeName.toLowerCase().includes(term) || !term;
    };
  }

  const None = 0;
  const active = "active";
  const inactive = "inactive";

  const Update = (
    <div className={styless.CabinetUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Gabinete {nameCabinet}</TitleModal>
        </div>
        <br />
        <TextField
          value={nameCabinet}
          onChange={(e) => dispatch(saveNameCabinetSelected(e.target.value))}
          required={true}
          placeholder="Nombre"
          className={styless.textfield}
        />
        <br />
        <TextField
          value={descriptionCabinet}
          onChange={(e) => dispatch(saveDescriptionSelected(e.target.value))}
          placeholder="Descripcion"
          required={true}
          className={styless.textfield}
        />
        <br />
        <br />
        <TitleArchive>Configuracion Gabinete: </TitleArchive>
        <Selected onChange={(e) => handleChangeConfig(e.target.value)}>
          {viewModeUpdate == true && (
            <option hidden>Estructura Jerarquica</option>
          )}

          {viewModeUpdate == false && <option hidden>Estructura TTHH</option>}
          <option value={active}>Estructura TTHH</option>
          <option value={inactive}>Estructura Jerarquica</option>
        </Selected>
        <br />
        <br />

        {FilesCabinets != "" ? (
          <TitleArchive>Tipo de Archivo Existente</TitleArchive>
        ) : (
          <TitleArchive>No tiene Archivos Existente</TitleArchive>
        )}

        {isLoadingTypeFile ? (
          <LoadingSpinner />
        ) : (
          <>
            {FilesCabinets != "" ? (
              <ContainerNameCheck>
                {FilesCabinets ? (
                  FilesCabinets.map(({ fileTypeId, fileTypeName }, index) => (
                    <ContainerCeldaSelected>
                      <ContainerCHeck>
                        <InputCheck
                          className="InputCheck"
                          type="checkbox"
                          checked={true}
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
            ) : (
              <></>
            )}
          </>
        )}

        <TitleArchive>Tipo de Archivo Nuevo</TitleArchive>
        {isLoadingTypeFile ? (
          <LoadingSpinner />
        ) : (
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
                        onChange={ObtenerCabinet}
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
                  <>
                    <ContainerCeldaSelected key={index}>
                      <ContainerCHeck>
                        <input
                          onChange={ObtenerCabinet}
                          className="InputCheck"
                          type="checkbox"
                          name={file.fileTypeName}
                          checked={file?.isChecked || false}
                          value={file.fileTypeId}
                          id={file.fileTypeId}
                        />
                      </ContainerCHeck>

                      <Tooltip title={file.fileTypeName}>
                        <ContainerText>{file.fileTypeName}</ContainerText>
                      </Tooltip>
                    </ContainerCeldaSelected>
                  </>
                ))
              ) : (
                <></>
              )}
            </ContainerNameCheck>
          </>
        )}
        <br />
        <br />
        <TitleArchive>Grupos: </TitleArchive>
        <Selected onChange={(e) => handleChange(e.target.value)}>
          <option value={None}>Ninguno</option>
          {groups ? (
            groups.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))
          ) : (
            <></>
          )}
        </Selected>
        <br />
        <br />
        <div align="right">
          <SaveButton>Actualizar</SaveButton>
          <CancelButton onClick={() => abrirModalUpdateCabinet()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const abrirModalUpdateCabinet = () => {
    dispatch(setOpenModalCabinetUpdate(false));
    dispatch(setClearCabinetDataUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={CabinetUpdate}>{Update}</Modal>
    </div>
  );
};

export default CabinetUpdate;

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
