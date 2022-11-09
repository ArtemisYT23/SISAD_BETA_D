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
  getFileTypesCabinetNew,
  setClearCabinetDataNew,
} from "../../../../../../redux/formData/CabinetData";
import { CreateCabinetNew } from "../../../../../../redux/states/Cabinet";
import { useDispatch, useSelector } from "react-redux";

const useStyless = makeStyles((theme) => ({
  CabinetCreated: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
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

const CabinetCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalCore, groupCore, typeFileCore, cabinetData } = useSelector(
    (store) => store
  );
  const { groups } = groupCore;
  const { TypeFileDefault, TypeFile } = typeFileCore;
  const { CabinetCreated } = modalCore;
  const { id, name, description, groupId, fileTypes } = cabinetData;
  const [fileTypeAll, setFileTypeAll] = useState([]);

  useEffect(() => {
    const FilterFileType = TypeFile.filter((item) => item.name !== ".PDF");
    setFileTypeAll(FilterFileType);
  }, [CabinetCreated]);

  const handleChange = (value) => {
    value != 0 ? dispatch(getGroupIdCabinetNew(value)) : dispatch(getGroupIdNullCabinetNew())
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gabinetes = {
        id: id,
        name: name,
        description: description,
        groupId: groupId,
        fileTypes: fileTypes
    }
    console.log(gabinetes);
    dispatch(CreateCabinetNew(gabinetes));
    abrirCerrarModal();
  };

  const ObtenerSelection = () => {
    const checkboxes = document.querySelectorAll(
      'input[name="fileOptions"]:checked'
    );
    const SelectedTypes = [];
    checkboxes.forEach((checkbox) => {
      SelectedTypes.push(checkbox.value);
    });
    dispatch(getFileTypesCabinetNew(SelectedTypes));
  };

  const Nule = 0;

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
        <TitleArchive>Tipo de Por defecto</TitleArchive>
        <ContainerCheckDefault>
          {TypeFileDefault && (
            <NameCelda>
              <input
                type="checkbox"
                checked={true}
                value={TypeFileDefault?.id}
              />
              {TypeFileDefault?.name}
            </NameCelda>
          )}
        </ContainerCheckDefault>

        <TitleArchive>Tipo de Archivo</TitleArchive>
        <div className="ContainerSelectedChech">
          <ContainerNameCheck>
            {fileTypeAll ? (
              fileTypeAll.map(({ id, name }, index) => (
                <NameCelda>
                  <input
                  onChange={ObtenerSelection}
                    className="InputCheck"
                    type="checkbox"
                    name="fileOptions"
                    value={id}
                    id={id}
                  />
                  {name}
                </NameCelda>
              ))
            ) : (
              <></>
            )}
          </ContainerNameCheck>
        </div>

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
