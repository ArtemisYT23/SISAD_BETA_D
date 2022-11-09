import { useState } from "react";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenModalGroupCreated,
  setCloseMenuContextGroup,
} from "../../../../../../redux/states/ActionCore";
import { CreateGroupNew } from "../../../../../../redux/states/Group";
import {
  getNameGroupNew,
  getDescriptionGroupNew,
  setClearGroupDataNew,
} from "../../../../../../redux/formData/GroupData";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  GroupCreated: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 16px 16px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const GroupCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();

  const { modalCore, groupData } = useSelector((store) => store);
  const { GroupCreated } = modalCore;
  const { id, name, description } = groupData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Group = {
      id: id,
      name: name,
      description: description,
    };
    dispatch(CreateGroupNew(Group));
    abrirCerrarModal();
  };

  const GroupForm = (
    <div className={styless.GroupCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Crear Nuevo Grupo</TitleModal>
        </div>
        <br />
        <TextField
          value={name}
          onChange={(e) => dispatch(getNameGroupNew(e.target.value))}
          required={true}
          label="nombre del Grupo"
          className={styless.textfield}
        />
        <br />
        <TextField
          value={description}
          onChange={(e) => dispatch(getDescriptionGroupNew(e.target.value))}
          required={true}
          label="descripción del Grupo"
          className={styless.textfield}
        />
        <br />
        <br />
        <div align="right">
          {name != "" && description != "" ? (<SaveButton>Crear</SaveButton>) : <></>}
          <CancelButton onClick={() => abrirCerrarModal()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const abrirCerrarModal = () => {
    dispatch(setOpenModalGroupCreated(false));
    dispatch(setCloseMenuContextGroup(false));
    dispatch(setClearGroupDataNew());
  };

  return (
    <div className={styless.container}>
      <Modal open={GroupCreated} onClose={abrirCerrarModal}>
        {GroupForm}
      </Modal>
    </div>
  );
};

export default GroupCreated;
