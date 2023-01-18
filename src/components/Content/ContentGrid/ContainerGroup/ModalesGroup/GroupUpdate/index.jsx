import { useState, useEffect } from "react";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { UpdateGroupNew } from "../../../../../../redux/states/Group";
import {
  setOpenModalGroupUpdate,
  setCloseMenuContextMantentGroup,
} from "../../../../../../redux/states/ActionCore";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  getIdGroupUpdate,
  getNameGroupUpdate,
  getDescriptionGroupUpdate,
  clearDataUpdateGroup,
} from "../../../../../../redux/formData/GroupData";

const useStyless = makeStyles((theme) => ({
  GroupUpdate: {
    position: "absolute",
    width: "460px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "13px",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const UpdateGroup = () => {
  const dispatch = useDispatch();
  const styless = useStyless();

  const { modalCore, groupCore, groupData } = useSelector((store) => store);
  const { UpdateSelectedGroup } = groupCore;
  const { GroupUpdate } = modalCore;
  const { idUpdate, nameUpdate, descriptionUpdate } = groupData;

  useEffect(() => {
    dispatch(getIdGroupUpdate(UpdateSelectedGroup?.id));
    dispatch(getNameGroupUpdate(UpdateSelectedGroup?.name));
    dispatch(getDescriptionGroupUpdate(UpdateSelectedGroup?.description));
  }, [GroupUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Group = {
      id: idUpdate,
      name: nameUpdate,
      description: descriptionUpdate,
    };
    dispatch(UpdateGroupNew(Group, idUpdate));
    abrirCerrarModal();
  };

  const GroupForm = (
    <div className={styless.GroupUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Crear Nuevo Grupo</TitleModal>
        </div>
        <br />
        <TextField
          value={nameUpdate}
          onChange={(e) => dispatch(getNameGroupUpdate(e.target.value))}
          required={true}
          label="nombre del Grupo"
          className={styless.textfield}
        />
        <br />
        <TextField
          value={descriptionUpdate}
          onChange={(e) => dispatch(getDescriptionGroupUpdate(e.target.value))}
          required={true}
          label="descripción del Grupo"
          className={styless.textfield}
        />
        <br />
        <br />
        <div align="right">
          {nameUpdate != "" && descriptionUpdate != "" ? (
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
    dispatch(setOpenModalGroupUpdate(false));
    dispatch(setCloseMenuContextMantentGroup(false));
    dispatch(clearDataUpdateGroup());
  };

  return (
    <div className={styless.container}>
      <Modal open={GroupUpdate} onClose={abrirCerrarModal}>
        {GroupForm}
      </Modal>
    </div>
  );
};

export default UpdateGroup;
