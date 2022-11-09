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
  saveFileTypeSelected,
  getGroupIdNullCabinetNew,
  setClearCabinetDataUpdate,
} from "../../../../../../redux/formData/CabinetData";

import LoadingSpinner from "../../../../../../utilities/LoadingSpinner";

const useStyless = makeStyles((theme) => ({
  CabinetUpdate: {
    position: "absolute",
    maxWidth: "450px",
    height: "550px",
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

const CabinetUpdate = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalCore, groupCore, typeFileCore, cabinetData, cabinetCore } = useSelector(
    (store) => store
  );

  const {
    idCabinet,
    nameCabinet,
    descriptionCabinet,
    onDay,
    groupIdCabinet,
    filetypeSelected,
  } = cabinetData;
  const { CabinetUpdate } = modalCore;
  const { UpdateSelectedCabinet } = cabinetCore;
  const { groups } = groupCore;
  const { FilesCabinets, FilesNoCabinets, isLoadingTypeFile } = typeFileCore;

  useEffect(() => {
    dispatch(saveIdCabinetSelected(UpdateSelectedCabinet?.id));
    dispatch(saveNameCabinetSelected(UpdateSelectedCabinet?.name));
    dispatch(saveDescriptionSelected(UpdateSelectedCabinet?.description));
    dispatch(saveGroupIdSelected(UpdateSelectedCabinet?.groupId));
  }, [CabinetUpdate]);

  const handleChange = (value) => {
    value != 0 ? dispatch(saveGroupIdSelected(value)) : dispatch(getGroupIdNullCabinetNew())
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormData = {
        id: idCabinet,
        name: nameCabinet,
        description: descriptionCabinet,
        onDay: onDay,
        groupId: groupIdCabinet,
        fileType: filetypeSelected
    }
    console.log(FormData);
    dispatch(UpdateCabinetCore(FormData, idCabinet, groupIdCabinet));
    abrirModalUpdateCabinet();
  };

  const ObtenerCabinet = () => {
    const checkboxes = document.querySelectorAll(
      'input[name="fileCabinet"]:checked'
    );
    const SelectedCabinetFiles = [];
    checkboxes.forEach((checkbox) => {
      SelectedCabinetFiles.push(checkbox.value);
    });
    dispatch(saveFileTypeSelected(SelectedCabinetFiles));
  };

  const None = 0;

  const Update = (
    <div className={styless.CabinetUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Gabinete {nameCabinet}</TitleModal>
        </div>

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
        {FilesCabinets != "" ? (
          <TitleArchive>Tipo de Archivo Existente</TitleArchive>
        ) : (
          <TitleArchive>No tiene Archivos Existente</TitleArchive>
        )}

        {isLoadingTypeFile ? (
          <LoadingSpinner />
        ) : (
          <div className="ContainerSelectedChech">
            {FilesCabinets != "" ? (
              <ContainerNameCheck>
                {FilesCabinets ? (
                  FilesCabinets.map(({ fileTypeId, fileTypeName }, index) => (
                    <div key={fileTypeId} className="NameCeldaCheck">
                      <input
                        className="InputCheck"
                        type="checkbox"
                        checked={true}
                      />
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
        )}

        <TitleArchive>Tipo de Archivo Nuevo</TitleArchive>
        {isLoadingTypeFile ? (
          <LoadingSpinner />
        ) : (
          <div className="ContainerSelectedChech">
            <ContainerNameCheck>
              {FilesNoCabinets ? (
                FilesNoCabinets.map(({ fileTypeId, fileTypeName }, index) => (
                  <div id={fileTypeId} className="NameCeldaCheck">
                    <input
                      onChange={ObtenerCabinet}
                      type="checkbox"
                      name="fileCabinet"
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
      <Modal open={CabinetUpdate} onClose={abrirModalUpdateCabinet}>
        {Update}
      </Modal>
    </div>
  );
};

export default CabinetUpdate;
