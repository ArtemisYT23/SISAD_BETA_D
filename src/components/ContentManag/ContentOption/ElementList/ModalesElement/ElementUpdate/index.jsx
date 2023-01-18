import { useState, useEffect } from "react";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalListElementUpdate } from "../../../../../../redux/states/ActionConfig";
import { UpdateElementListConfig } from "../../../../../../redux/states/List";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  getIdElementUpdate,
  getNameElementUpdate,
  getListIdElementUpdate,
  clearElementUpdate,
} from "../../../../../../redux/formData/ElementData";

const useStyless = makeStyles((theme) => ({
  ListElementUpdate: {
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

const ElementUpdate = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, elementDataNew, listCore } = useSelector(
    (store) => store
  );
  const { ListElementUpdate } = modalConfig;
  const { idUpdate, nameUpdate, listIdUpdate } = elementDataNew;
  const { selectedElement } = listCore;

  useEffect(() => {
    dispatch(getIdElementUpdate(selectedElement?.id));
    dispatch(getNameElementUpdate(selectedElement?.name));
    dispatch(getListIdElementUpdate(selectedElement?.listId));
  }, [ListElementUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Element = {
      id: idUpdate,
      name: nameUpdate,
      listId: listIdUpdate,
    }
    console.log(Element);
    dispatch(UpdateElementListConfig(Element, idUpdate, listIdUpdate));
    OpenModalEditElementConfig();
  };

  const body = (
    <div className={styless.ListElementUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Editar Elemento</TitleModal>
        </div>
        <br />
        <TextField
          value={nameUpdate}
          onChange={(e) => dispatch(getNameElementUpdate(e.target.value))}
          label="Nombre"
          className={styless.textfield}
          autoComplete="off"
        />
        <br />
        <br />
        <div align="right">
          <SaveButton>Guardar</SaveButton>
          <CancelButton onClick={() => OpenModalEditElementConfig()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalEditElementConfig = () => {
    dispatch(setOpenModalListElementUpdate(false));
    dispatch(clearElementUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={ListElementUpdate} onClose={OpenModalEditElementConfig}>
        {body}
      </Modal>
    </div>
  );
};

export default ElementUpdate;
