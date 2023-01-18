import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalTypeFileUpdate } from "../../../../../../redux/states/ActionConfig";
import { UpdateTypeFileConfig } from "../../../../../../redux/states/FileType";
import {
  TitleModal,
  SaveButton,
  CancelButton,
  TitleArchive,
  Selected,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  getIdFileTypeUpdate,
  getNameFileTypeUpdate,
  getDescriptionFileTypeUpdate,
  getDefaultFileTypeUpdate,
  getDefaultFileTrueTypeUpdate,
  getDefaultFileFalseTypeUpdate,
  clearFileTypeUpdate,
} from "../../../../../../redux/formData/FileTypeData";
import { useEffect } from "react";

const useStyless = makeStyles((theme) => ({
  TypeFileUpdate: {
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

const TypeFileUpdate = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, FileTypeData, typeFileCore } = useSelector(
    (store) => store
  );
  const { SelectedTypeFile } = typeFileCore;
  const { TypeFileUpdate } = modalConfig;
  const { idUpdate, nameUpdate, descriptionUpdate, isDefault } = FileTypeData;

  useEffect(() => {
    dispatch(getIdFileTypeUpdate(SelectedTypeFile?.id));
    dispatch(getNameFileTypeUpdate(SelectedTypeFile?.name));
    dispatch(getDescriptionFileTypeUpdate(SelectedTypeFile?.description));
    dispatch(getDefaultFileTypeUpdate(SelectedTypeFile?.isDefault));
  }, [TypeFileUpdate]);

  const handleChange = (value) => {
    value != 0
      ? dispatch(getDefaultFileTrueTypeUpdate())
      : dispatch(getDefaultFileFalseTypeUpdate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileTypeUpdate = {
      id: idUpdate,
      name: nameUpdate,
      description: descriptionUpdate,
      isDefault: isDefault,
    };
    console.log(fileTypeUpdate);
    dispatch(UpdateTypeFileConfig(fileTypeUpdate, idUpdate));
    OpenModalTypeFileUpdate();
  };

  const Verdad = 1;
  const Falso = 0;

  const bodyUpdate = (
    <div className={styless.TypeFileUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Crear Nuevo Elemento</TitleModal>
        </div>
        <br />
        <TextField
          value={nameUpdate}
          onChange={(e) => dispatch(getNameFileTypeUpdate(e.target.value))}
          required={true}
          label="Nombre"
          className={styless.textfield}
        />
        <br />
        <TextField
          value={descriptionUpdate}
          onChange={(e) =>
            dispatch(getDescriptionFileTypeUpdate(e.target.value))
          }
          required={true}
          label="Descripcion"
          className={styless.textfield}
        />
        <br />
        <br />
        <TitleArchive>Por Defecto</TitleArchive>
        <Selected onChange={(e) => handleChange(e.target.value)}>
          {isDefault ? (
            <option hidden>True</option>
          ) : (
            <option hidden>False</option>
          )}
          <option value={Verdad}>True</option>
          <option value={Falso}>False</option>
        </Selected>
        <br />
        <br />
        <div align="right">
          <SaveButton>Actualizar</SaveButton>
          <CancelButton onClick={() => OpenModalTypeFileUpdate()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalTypeFileUpdate = () => {
    dispatch(setOpenModalTypeFileUpdate(false));
    dispatch(clearFileTypeUpdate());
  };

  return (
    <div>
      <div className={styless.container}>
        <Modal open={TypeFileUpdate} onClose={OpenModalTypeFileUpdate}>
          {bodyUpdate}
        </Modal>
      </div>
    </div>
  );
};

export default TypeFileUpdate;
