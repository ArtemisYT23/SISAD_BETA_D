import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalTypeDataUpdate } from "../../../../../../redux/states/ActionConfig";
import { UpdateTypeDataConfig } from "../../../../../../redux/states/DataType";
import {
  getIdDataTypeUpdate,
  getNameDataTypeUpdate,
  clearDataTypeUpdate,
} from "../../../../../../redux/formData/DataTypeData";
import { TitleModal, SaveButton, CancelButton } from "../../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  TypeDataUpdate: {
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

const TypeDataUpdate = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, DataTypeData, typeDataCore } = useSelector(
    (store) => store
  );
  const { TypeDataUpdate } = modalConfig;
  const { SelectedTypeData } = typeDataCore;
  const { idUpdate, nameUpdate } = DataTypeData;

  useEffect(() => {
    dispatch(getIdDataTypeUpdate(SelectedTypeData?.id));
    dispatch(getNameDataTypeUpdate(SelectedTypeData?.name))
  },[TypeDataUpdate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const DataUpdate = {
        id: idUpdate,
        name: nameUpdate
    }
    dispatch(UpdateTypeDataConfig(DataUpdate, idUpdate));
    OpenModalDataTypeUpdateConfig();
  };

  const typeDataEdit = (
    <div className={styless.TypeDataUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Editar Tipo de Dato {SelectedTypeData?.name}</TitleModal>
        </div>
        <br />
        <TextField
          value={nameUpdate}
          onChange={(e) => dispatch(getNameDataTypeUpdate(e.target.value))}
          label="Nombre"
          required={true}
          className={styless.textfield}
        />
        <br />
        <br />
        <div align="right">
          <SaveButton>Crear</SaveButton>
          <CancelButton
            onClick={() => OpenModalDataTypeUpdateConfig()}
          >
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalDataTypeUpdateConfig = () => {
    dispatch(setOpenModalTypeDataUpdate(false));
    dispatch(clearDataTypeUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={TypeDataUpdate} onClose={OpenModalDataTypeUpdateConfig}>
        {typeDataEdit}
      </Modal>
    </div>
  );
};

export default TypeDataUpdate;
