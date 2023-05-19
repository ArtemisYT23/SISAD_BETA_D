import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  TitleModal,
  SaveButton,
  CancelButton,
  ContainerNameCheck,
  NameCelda,
  TitleArchive,
  Selected,
  ContainerCheckDefault,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  setOpenModalCabinetCreated,
  setCloseMenuContextGroup,
} from "../../../../../../redux/states/ActionCore";
import {
  getNameCabinetNew,
  getDescriptionCabinetNew,
  getGroupIdCabinetNew,
  getGroupIdNullCabinetNew,
  getConfiguracionCabinetNew,
  getFileTypesCabinetNew,
  setClearCabinetDataNew,
} from "../../../../../../redux/formData/CabinetData";
import { CreateCabinetNew } from "../../../../../../redux/states/Cabinet";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@material-ui/core";

const useStyless = makeStyles((theme) => ({
  CabinetCreated: {
    position: "absolute",
    width: "400px",
    height: "515px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
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

const CabinetCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalCore, groupCore, typeFileCore, cabinetData } = useSelector(
    (store) => store
  );
  const { groups } = groupCore;
  const { TypeFileDefault, TypeFile } = typeFileCore;
  const { CabinetCreated } = modalCore;
  const { id, name, description, groupId, viewMode, fileTypes } = cabinetData;
  const [fileTypeAll, setFileTypeAll] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    const FilterFileType = TypeFile.filter((item) => item.name !== ".PDF");
    setFileTypeAll(FilterFileType);
  }, [CabinetCreated]);

  const handleChange = (value) => {
    value != 0
      ? dispatch(getGroupIdCabinetNew(value))
      : dispatch(getGroupIdNullCabinetNew());
  };

  const handleChangeConfig = (value) => {
    dispatch(getConfiguracionCabinetNew(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gabinetes = {
      id: id,
      name: name,
      description: description,
      groupId: groupId,
      viewMode: viewMode,
      fileTypes: fileTypes,
    };
    console.log(gabinetes);
    dispatch(CreateCabinetNew(gabinetes));
    abrirCerrarModal();
  };

  const ObtenerSelection = (e) => {
    const SelectedTypes = [];
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = fileTypeAll.map((file) => {
        return { ...file, isChecked: checked };
      });
      setFileTypeAll(tempUser);
      tempUser.map((temp) => {
        if (temp.isChecked == true) {
          SelectedTypes.push(temp.id);
        }
      });
    } else {
      let tempUser = fileTypeAll.map((file) =>
        file.name === name ? { ...file, isChecked: checked } : file
      );
      setFileTypeAll(tempUser);
      tempUser.map((temp) => {
        if (temp.isChecked == true) {
          SelectedTypes.push(temp.id);
        }
      });
    }
    dispatch(getFileTypesCabinetNew(SelectedTypes));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.name.toLowerCase().includes(term) || !term;
    };
  }

  const Nule = 0;
  const active = "active";
  const inactive = "inactive";

  const cabinet = (
    <div className={styless.CabinetCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Crear Gabinete Nuevo</TitleModal>
        </div>
        <br />
        <TextField
          value={name}
          onChange={(e) => dispatch(getNameCabinetNew(e.target.value))}
          required={true}
          label="nombre del gabinete"
          className={styless.textfield}
        />
        <br />
        <TextField
          value={description}
          onChange={(e) => dispatch(getDescriptionCabinetNew(e.target.value))}
          required={true}
          label="descripción"
          className={styless.textfield}
        />
        <br />
        <br />
        <TitleArchive>Grupos: </TitleArchive>
        <Selected onChange={(e) => handleChange(e.target.value)}>
          <option value={Nule}>Ninguno</option>
          {groups ? (
            groups.map(({ id, name }, index) => (
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
        <TitleArchive>Configuracion Gabinete: </TitleArchive>
        <Selected onChange={(e) => handleChangeConfig(e.target.value)}>
          <option hidden>Selecione Configuracion</option>
          <option value={active}>Estructura TTHH</option>
          <option value={inactive}>Estructura Jerarquica</option>
        </Selected>
        <br />
        <br />
        <TitleArchive>Tipo Archivo Por defecto</TitleArchive>
        <ContainerCheckDefault>
          {TypeFileDefault && (
            <ContainerCeldaSelected>
              <ContainerCHeck>
                <InputCheck
                  type="checkbox"
                  checked={true}
                  value={TypeFileDefault?.id}
                />
              </ContainerCHeck>
              <Tooltip title={TypeFileDefault?.name}>
                <ContainerText>{TypeFileDefault?.name}</ContainerText>
              </Tooltip>
            </ContainerCeldaSelected>
          )}
        </ContainerCheckDefault>
        <br />
        <TitleArchive>Tipo de Archivo</TitleArchive>
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
                    onChange={ObtenerSelection}
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
                    <InputCheck
                      onChange={ObtenerSelection}
                      className="InputCheck"
                      type="checkbox"
                      name={file.name}
                      checked={file?.isChecked || false}
                      value={file.id}
                      id={file.id}
                    />
                  </ContainerCHeck>
                  <Tooltip title={file.name}>
                    <ContainerText>{file.name}</ContainerText>
                  </Tooltip>
                </ContainerCeldaSelected>
              </>
            ))
          ) : (
            <></>
          )}
        </ContainerNameCheck>

        <br />
        <br />
        <div align="right">
          {name != "" && description != "" ? (
            <SaveButton>Crear</SaveButton>
          ) : (
            <></>
          )}
          <CancelButton onClick={() => abrirCerrarModal()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const abrirCerrarModal = () => {
    dispatch(setOpenModalCabinetCreated(false));
    dispatch(setCloseMenuContextGroup(false));
    dispatch(setClearCabinetDataNew());
  };

  return (
    <div className={styless.container}>
      <Modal open={CabinetCreated} onClose={abrirCerrarModal}>
        {cabinet}
      </Modal>
    </div>
  );
};

export default CabinetCreated;

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
